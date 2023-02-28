<template>
	<el-button type="danger" @click="handleCreate(); isEdit = false;">Create</el-button>
	<el-button type="danger" @click="handleExport()">Export</el-button>
	<el-button type="danger" @click="dialogFileVisible = true;">Import</el-button>
	<el-table :data="filterTableData" style="width: 100%" :default-sort="{ prop: 'id', order: 'ascending' }">
		<el-table-column prop="id" label="id" width="80" />
		<el-table-column prop="name" label="买家" width="80" sortable :sort-orders="sortOrders" />
		<el-table-column prop="balance" label="余额" width="80" />
		<el-table-column prop="used" label="使用" width="90" />
		<el-table-column prop="deposit" label="总存钱量" width="90" />
		<el-table-column align="center">
			<template #header>
				<el-input v-model="search" size="small" placeholder="Type to search by user" />
			</template>
			<template #default="scope">
				<el-button size="small"
					@click="dialogFormVisible = true; isEdit = true; beforeEditName = scope.row.name; form.name = scope.row.name; form.deposit = scope.row.deposit; form.used = scope.row.used; form.increase = 0; form.decrease = 0;">
					编辑
				</el-button>
				<el-button size="small" type="danger" @click="handleDelete(scope.row.name)">删除</el-button>
			</template>
		</el-table-column>
	</el-table>
	<el-dialog v-model="dialogFormVisible" title="详情/编辑">
		<el-form :model="form">
			<el-form-item label="客户" label-width="140px">
				<el-input v-model="form.name" autocomplete="off" style="width: 250px;" />
			</el-form-item>
			<el-form-item label="总存钱数" label-width="140px">
				{{form.deposit}} +&nbsp;
				<el-input v-model="form.increase" autocomplete="off" style="width: 100px;" />
				&nbsp;&nbsp;-&nbsp;&nbsp;
				<el-input v-model="form.decrease" autocomplete="off" style="width: 100px;" />
			</el-form-item>
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
	<el-dialog v-model="dialogFileVisible" title="Import data from file">
		<file_import :refData="fileValue" :fileList="fileList" />
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
		computed,
	} from 'vue';
	import {
		initDB,
		getAllUsers,
		deleteUser,
		addOrUpdateUser
	} from '../../views/panel/panel.vue';
	import { UserInterface } from '../../models/User';
	import file_import from '../file_import/file_import.vue';

	export default {
		data() {
			return {
				fileValue: {
					val: null
				},
				fileList: [],
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
					name: "",
					deposit: 0,
					increase: 0,
					decrease: 0,
					used: 0
				},
				isEdit: false,
				beforeEditName: ""
			}
		},

		methods: {
			handleDelete(name: string) {
				deleteUser(this, name, fetchAndDisplayUsers);
			},

			handleCreate() {
				this.form.name = "";
				this.form.deposit = 0;
				this.form.increase = 0;
				this.form.decrease = 0;
				this.form.used = 0;
				this.dialogFormVisible = true;
			},

			handleEdit() {
				const nuser = {
					name: this.form.name,
					deposit: Number(this.form.deposit) + Number(this.form.increase) - Number(this.form.decrease),
					used: this.form.used
				};
				if(this.isEdit)
					deleteUser(this, this.beforeEditName, ()=>{});
				addOrUpdateUser(this, nuser, fetchAndDisplayUsers);
				this.search = nuser.name;
			},

			handleExport() {
				const getRequest = getAllUsers(this.db);

				getRequest.onsuccess = (_event): void => {;
					const originData = getRequest.result;
					const jsonData = JSON.stringify(originData);
					const type = 'application/json';
					const filename = 'users.json';
					downloadFile(jsonData, type, filename);
				}

				getRequest.onerror = (_event): void => {
					alert('数据导出失败');
				}
			},

			handleImport() {
				importUsersJson(this, this.fileValue.val);
				this.fileList = [];
			}
		},
		mounted() {
			initDB(this, fetchAndDisplayUsers);
		},
	};

	const tableData = new Set<User>();

	class User {
		id: number
		name: string
		deposit: number
		used: number
		balance: number

		public constructor(user: UserInterface, id: number) {
			this.id = id;
			this.name = user.name;
			this.deposit = user.deposit;
			this.used = user.used;
			this.balance = user.deposit - user.used;
		}
	}

	function importUsersJson(obj: any, jsonData: any) {
		jsonData.forEach(data => {
			addOrUpdateUser(obj, data, fetchAndDisplayUsers);
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

	export function fetchAndDisplayUsers(obj: any) {
		const getRequest = getAllUsers(obj.db);

		getRequest.onsuccess = (_event): void => {
			tableData.clear();
			let i = 1;
			getRequest.result.forEach((data: User) => {
				tableData.add(new User(data, i++));
			});
			obj.filterTableData = computed(() =>
				Array.from(tableData).filter(
					(data) =>
					!obj.search ||
					data.name.toLowerCase().includes(obj.search.toLowerCase())
				));
		}

		getRequest.onerror = (_event): void => {
			alert('数据刷新失败');
		}
	}

	export const calculateDeposit = (obj): void => {
		obj.sumDeposit = 0;
		tableData.forEach(data => obj.sumDeposit += data.balance);
		console.log(obj.sumDeposit);
	}
</script>

<style>
</style>
