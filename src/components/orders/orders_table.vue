<template>
	<el-button type="danger" @click="handleCreate()">Create</el-button>
	<el-button type="danger" @click="handleExport()">Export</el-button>
	<el-button type="danger" @click="dialogFileVisible = true;">Import</el-button>
	<el-table :data="filterTableData" style="width: 100%" :default-sort="{ prop: 'id', order: 'descending' }">
		<el-table-column fixed prop="id" label="id" width="70" sortable :sort-orders="sortOrders" />
		<el-table-column prop="user" label="买家" width="80" />
		<el-table-column prop="bag" label="包名" width="80" />
		<el-table-column prop="stage_str" label="状态" width="120" />
		<el-table-column prop="update_str" label="最新更新日期" width="135" sortable :sort-orders="sortOrders"
			sort-by="update" />
		<el-table-column prop="benefit" label="收入计算" width="90" sortable :sort-orders="sortOrders" />
		<el-table-column prop="buy_price" label="我卖价" width="90" sortable :sort-orders="sortOrders" />
		<el-table-column prop="sell_price" label="我买价" width="90" sortable :sort-orders="sortOrders" />
		<el-table-column prop="sender" label="快递员" width="90" sortable :sort-orders="sortOrders" />
		<el-table-column prop="send_price" label="快递费" width="90" sortable :sort-orders="sortOrders" />
		<el-table-column fixed="right" align="center" width="250">
			<template #header>
				<el-input v-model="search" size="small"
					placeholder="Type to search by buyer or bag or date or sender" />
			</template>
			<template #default="scope">
				<el-button size="small" @click="form.id = scope.row.id; showOrderDetail();">
					详情/编辑
				</el-button>
				<el-button size="small" @click="handleNext(scope.row.id)">新状态</el-button>
				<el-button size="small" type="danger"
					@click="deleteId = scope.row.id; deleteMoney = scope.row.sell_price; deleteUser = scope.row.user; dialogDeleteVisible=true;">
					删除
				</el-button>
			</template>
		</el-table-column>
	</el-table>
	<el-dialog v-model="dialogFormVisible" title="详情/编辑">
		<el-form :model="form">
			0 - 接单 1 - 订货 2 - 厂家接单 3 - 我收到 4 - 飘洋过海 5 - 寄出 6 - 买家收到(完成)
			<br />
			<br />
			<el-form-item label="买家" label-width="140px">
				<el-input v-model="form.user" autocomplete="off" style="width: 300px;" />
			</el-form-item>
			<el-form-item label="包名" label-width="140px">
				<el-input v-model="form.bag" autocomplete="off" style="width: 300px;" />
			</el-form-item>
			<el-form-item label="我买价" label-width="140px">
				<el-input v-model="form.buy_price" autocomplete="off" style="width: 300px;" />
			</el-form-item>
			<el-form-item label="我卖价" label-width="140px">
				<el-input v-model="form.sell_price" autocomplete="off" style="width: 300px;" />
			</el-form-item>
			<el-form-item label="快递费" label-width="140px">
				<el-input v-model="form.send_price" autocomplete="off" style="width: 300px;" />
			</el-form-item>
			<el-form-item label="快递员" label-width="140px">
				<el-input v-model="form.sender" autocomplete="off" style="width: 300px;" />
			</el-form-item>
			<el-form-item label="收益" label-width="140px">
				&nbsp;&nbsp;{{form.benefit}}
			</el-form-item>
			<el-form-item label="当前状态" label-width="140px">
				<el-input v-model="form.stage" autocomplete="off" style="width: 300px;" />
				&nbsp;&nbsp; 更新时间 {{form.update_str}}
			</el-form-item>
			<p>
				历史：<br />
				<label v-for="stage in form.history">{{stages[stage.stage]}} =
					{{dateToString(stage.date)}}&nbsp;&nbsp;&nbsp;</label>
			</p>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogFormVisible = false">Cancel</el-button>
				<el-button type="primary" @click="dialogFormVisible = false; handleEdit();">
					Confirm
				</el-button>
			</span>
		</template>
	</el-dialog>
	<el-dialog v-model="dialogDeleteVisible" title="是否还原金额到该买家账户">
		<el-form :model="form">
			<el-form-item label-width="140px">
				<el-radio-group v-model="deleteRadio">
					<el-radio :label="0">否</el-radio>
					<el-radio :label="1">是</el-radio>
				</el-radio-group>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogDeleteVisible = false">Cancel</el-button>
				<el-button type="primary" @click="dialogDeleteVisible = false; handleDelete();">
					Confirm
				</el-button>
			</span>
		</template>
	</el-dialog>
	<el-dialog v-model="dialogFileVisible" title="Import data from file">
		<file_import :refData="fileValue" />
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogFileVisible = false">Cancel</el-button>
				<el-button type="primary" @click="dialogFileVisible = false; handleImport();">
					Confirm
				</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script lang="ts">
	import {
		computed
	} from 'vue';

	import {
		initDB,
		getAllOrders,
		getUser,
		getOrder,
		deleteOrder,
		addOrUpdateOrder,
		addOrUpdateUser
	} from '../../views/panel/panel.vue';

	import file_import from '../file_import/file_import.vue';

	let tableData = [];

	export default {
		data() {
			return {
				fileValue: {
					val: null
				},
				stages: ["接单", "订货", "厂家接单", "我收到", "飘洋过海", "寄出", "买家收到(完成)"],
				db: null,
				sortOrders: [{
						label: '降序',
						value: 'descending'
					},
					{
						label: '升序',
						value: 'ascending'
					},
				],
				search: "",
				filterTableData: [],
				userCreate: "",
				dialogFormVisible: false,
				dialogFileVisible: false,
				form: {
					id: -1,
					user: "",
					bag: "",
					buy_price: 0,
					sell_price: 0,
					send_price: 0,
					sender: "",
					benefit: 0,
					stage: 0,
					update: new Date(),
					update_str: "",
					history: [],
				},
				calculateUsedOriginMoney: 0,
				calculateUsedOriginUser: "",
				dialogDeleteVisible: false,
				deleteId: -1,
				deleteRadio: 0,
				deleteMoney: 0,
				deleteUser: "",
			}
		},

		methods: {
			handleDelete() {
				if (this.deleteRadio == 1) {
					let that = this;
					let getRequest = getUser(this.db, this.deleteUser);
					getRequest.onsuccess = function(event) {
						let tempUser = getRequest.result;
						tempUser.used -= that.deleteMoney;
						addOrUpdateUser(that, tempUser);
					}
					getRequest.onerror = function(event) {
						alert('原用户获取失败');
						return;
					}
				}
				deleteOrder(this, this.deleteId, fetchAndDisplayOrders);
			},

			handleCreate() {
				this.form.id = -1;
				this.form.user = "";
				this.form.bag = "";
				this.form.buy_price = 0;
				this.form.sell_price = 0;
				this.form.send_price = 0;
				this.form.sender = "";
				this.form.benefit = 0;
				this.form.stage = 0;
				this.form.update = new Date();
				this.form.history = [{
					stage: 0,
					date: this.form.update
				}];
				this.form.update_str = this.dateToString(this.form.update);
				this.calculateUsedOriginMoney = 0;
				this.calculateUsedOriginUser = "";
				this.dialogFormVisible = true;
			},

			handleNext(id: number) {
				let getRequest = getOrder(this.db, id);
				let that = this;
				getRequest.onsuccess = function(event) {
					let curStage = getRequest.result.history[getRequest.result.history.length - 1].stage;
					if (curStage == 6) {
						alert("已完成了！")
						return;
					}
					getRequest.result.history.push({
						stage: Number(curStage) + 1,
						date: new Date()
					});
					addOrUpdateOrder(that, getRequest.result, fetchAndDisplayOrders);
				}
				getRequest.onerror = function(event) {
					alert('状态更新失败');
				}
			},

			showOrderDetail() {
				if (this.form.id != -1) {
					let getOrderRequest = getOrder(this.db, Number(this.form.id));
					let that = this;
					getOrderRequest.onsuccess = function(event) {
						that.form = new Order(getOrderRequest.result);
						that.calculateUsedOriginMoney = that.form.sell_price;
						that.calculateUsedOriginUser = that.form.user;
						that.dialogFormVisible = true;
					}
					getOrderRequest.onerror = function(event) {
						alert("获取订单错误,不存在这个id的订单");
						that.dialogFormVisible = false;
						return;
					}
				}
			},

			handleEdit() {
				let getRequest = getUser(this.db, this.form.user);
				let that = this;
				getRequest.onsuccess = function(event) {
					if (getRequest.result === undefined) {
						alert("该用户不存在, 请先创建该用户");
						that.dialogFormVisible = false;
						return;
					} else {
						if (that.form.stage != that.form.history[that.form.history.length - 1].stage) {
							that.form.history.push({
								stage: that.form.stage,
								date: new Date()
							});
						}

						let norder = {
							id: that.form.id,
							user: that.form.user,
							bag: that.form.bag,
							buy_price: that.form.buy_price,
							sell_price: that.form.sell_price,
							send_price: that.form.send_price,
							sender: that.form.sender,
							history: that.form.history
						};

						addOrUpdateOrder(that, norder, fetchAndDisplayOrders);

						if (norder.user != that.calculateUsedOriginUser) {
							let tempUser = getRequest.result;
							tempUser.used += norder.sell_price;
							addOrUpdateUser(that, tempUser);
							let getOldRequest = getUser(that.db, that.calculateUsedOriginUser);
							getOldRequest.onsuccess = function(event) {
								let originUser = getOldRequest.result;
								originUser.used -= norder.sell_price;
								addOrUpdateUser(that, originUser);
							}
							getRequest.onerror = function(event) {
								alert('原用户获取失败');
								return;
							}
						} else if (norder.sell_price != that.calculateUsedOriginMoney) {
							let tempUser = getRequest.result;
							tempUser.used -= that.calculateUsedOriginMoney - norder.sell_price;
							addOrUpdateUser(that, tempUser);
						}

						that.search = norder.user;
					}
				}
				getRequest.onerror = function(event) {
					alert('用户获取失败');
					return;
				}
			},

			handleExport() {
				let getRequest = getAllOrders(this.db);

				getRequest.onsuccess = function(event) {
					let originData = [];
					originData = getRequest.result;
					let jsonData = JSON.stringify(originData);
					let type = 'application/json';
					let filename = 'orders.json';
					downloadFile(jsonData, type, filename);
				}
				getRequest.onerror = function(event) {
					alert('数据导出失败');
				}
			},

			handleImport() {
				importOrdersJson(this, this.fileValue.val);
			},

			dateToString(date: Date) {
				return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
			}

		},
		mounted() {
			initStages(this.stages);
			initDB(this, fetchAndDisplayOrders);
		},
	};

	const stages: string[] = ["接单", "订货", "厂家接单", "我收到", "飘洋过海", "寄出", "买家收到(完成)"];

	function initStages(obj) {
		obj = stages;
	}

	class HistoryItem {
		stage: number
		date: Date

		public constructor(id: number, date_str: string) {
			this.stage = id;
			this.date = new Date(date_str);
		}
	}

	class Order {
		id: number
		user: string
		bag: string
		buy_price: number
		sell_price: number
		send_price: number
		sender: string
		benefit: number
		stage: number
		stage_str: string
		update: Date
		update_str: string
		history: Array < HistoryItem > = []

		public constructor(order: any) {
			this.id = order.id;
			this.user = order.user;
			this.bag = order.bag;
			this.buy_price = order.buy_price;
			this.sell_price = order.sell_price;
			this.send_price = order.send_price;
			this.sender = order.sender;
			this.benefit = order.sell_price - order.buy_price - order.send_price;
			this.stage = order.history[order.history.length - 1].stage;
			this.stage_str = stages[order.history[order.history.length - 1].stage];
			order.history.forEach(stg => {
				this.history.push(new HistoryItem(stg.stage, stg.date));
			});
			this.update = this.history[this.history.length - 1].date;
			this.update_str = this.update.getFullYear() + "-" + (this.update.getMonth() + 1) + "-" + this.update
				.getDate();
		}
	}

	function importOrdersJson(obj: any, jsonData: any) {
		jsonData.forEach(data => {
			addOrUpdateOrder(obj, data, fetchAndDisplayOrders);
		});
	}

	function downloadFile(data, type, filename) {
		let blob = new Blob([data], {
			type
		});
		let url = URL.createObjectURL(blob);
		let link = document.createElement('a');
		link.download = filename;
		link.href = url;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	}

	function fetchAndDisplayOrders(obj: any) {
		let getRequest = getAllOrders(obj.db);
		getRequest.onsuccess = function(event) {
			tableData = [];
			getRequest.result.forEach(data => {
				tableData.push(new Order(data));
			});
			obj.filterTableData = computed(() =>
				tableData.filter(
					(data) =>
					!obj.search ||
					data.user.toLowerCase().includes(obj.search.toLowerCase()) ||
					data.bag.toLowerCase().includes(obj.search.toLowerCase()) ||
					data.sender.toLowerCase().includes(obj.search.toLowerCase()) ||
					data.update_str.includes(obj.search)
				));
		};
		getRequest.onerror = function(event) {
			alert('数据刷新失败');
		}
	};

	export function calculateBenefit(obj) {
		obj.sumBenefit = 0;
		tableData.forEach(data => obj.sumBenefit += data.benefit);
	}
</script>

<style>
</style>
