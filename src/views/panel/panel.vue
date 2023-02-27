<template>
	<el-tabs type="border-card" class="demo-tabs" v-model="activeName" @tab-click="handleTabClick">
		<el-tab-pane name="order">
			<template #label>
				<span class="custom-tabs-label">
					<el-icon>
						<Suitcase />
					</el-icon>
					<span>Orders</span>
				</span>
			</template>
			<orders_table />
		</el-tab-pane>
		<el-tab-pane name="user">
			<template #label>
				<span class="custom-tabs-label">
					<el-icon>
						<User />
					</el-icon>
					<span>Users</span>
				</span>
			</template>
			<users_table />
		</el-tab-pane>
		<el-tab-pane name="me">
			<template #label>
				<span class="custom-tabs-label">
					<el-icon>
						<CreditCard />
					</el-icon>
					<span>Me</span>
				</span>
			</template>
			<el-tag class="ml-2" type="info" size="large" v-model="sumDeposit">总存款: {{sumDeposit}}</el-tag>
			<br>
			<el-tag class="ml-2" type="info" size="large" v-model="sumBenefit">总收益: {{sumBenefit}}</el-tag>
			<p style="font-size: 10px;">
				金额计算:
				<br />
				1. 订单的“我卖价”会自动扣除到对应买家的个人存款上
				<br />
				2. 我的总存款 = 所有买家的余额 （所以这里不包含收益）
				<br />
				3. 我的总收益 = 所有订单的收益 （所以删除的订单，收益就会消失）
			</p>
		</el-tab-pane>
	</el-tabs>
</template>

<script>
	import {
		Suitcase,
		User,
		CreditCard
	} from '@element-plus/icons-vue';
	import orders_table, {calculateBenefit} from '../../components/orders/orders_table.vue';
	import users_table, {calculateDeposit} from '../../components/users/users_table.vue';


	export default {
		data(){
			return {
				sumDeposit: 0,
				sumBenefit: 0,
				activeName: "order"
			}
		},
		components: {
			Suitcase,
			User,
			CreditCard
		},
		methods:{
			handleTabClick(tab, event){
				if(tab.index == 2){
					calculateBenefit(this);
					calculateDeposit(this);
				}
			}
		}
	}

	export let activeIndex = 0;

	export function initDB(obj, func = undefined) {
		let requestDB = indexedDB.open("bagPack", 1);

		requestDB.onsuccess = function(event) {
			obj.db = event.target.result;

			if (!!func)
				func(obj);
		};

		requestDB.onerror = function(event) {
			console.log("Database error: " + event.target.errorCode);
		};

		requestDB.onupgradeneeded = function(event) {
			obj.db = event.target.result;
			obj.db.createObjectStore("orders", {
				keyPath: "id",
				autoIncrement: true
			});
			obj.db.createObjectStore("users", {
				keyPath: "name"
			});
		};
	}

	export function addOrUpdateUser(obj, user, func = undefined) {
		let request = obj.db.transaction(['users'], 'readwrite')
			.objectStore('users')
			.put({
				name: user.name,
				deposit: user.deposit,
				used: user.used
			});
		request.onsuccess = function(event) {
			console.log('数据写入成功');
			if (!!func)
				func(obj);
			else
				location.reload();
		}
		request.onerror = function(event) {
			alert('数据写入失败');
		}
	}

	export function deleteUser(obj, user_name, func) {
		let request = obj.db.transaction(['users'], 'readwrite')
			.objectStore('users')
			.delete(user_name);
		request.onsuccess = function(event) {
			console.log('数据删除成功');
			func(obj);
		}
		request.onerror = function(event) {
			alert('数据删除失败');
		}
	}

	export function addOrUpdateOrder(obj, order, func) {
		if (order.id == -1) {
			let request = obj.db.transaction(['orders'], 'readwrite')
				.objectStore('orders')
				.put({
					user: order.user,
					bag: order.bag,
					buy_price: order.buy_price,
					sell_price: order.sell_price,
					send_price: order.send_price,
					sender: order.sender,
					history: JSON.parse(JSON.stringify(order.history))
				});
			request.onsuccess = function(event) {
				console.log('数据写入成功');
				func(obj);
			}
			request.onerror = function(event) {
				alert('数据写入失败');
			}
			return;
		}

		let request = obj.db.transaction(['orders'], 'readwrite')
			.objectStore('orders')
			.put({
				id: order.id,
				user: order.user,
				bag: order.bag,
				buy_price: order.buy_price,
				sell_price: order.sell_price,
				send_price: order.send_price,
				sender: order.sender,
				history: JSON.parse(JSON.stringify(order.history))
			});
		request.onsuccess = function(event) {
			console.log('数据写入成功');
			func(obj);
		}
		request.onerror = function(event) {
			alert('数据写入失败');
		}
	}

	export function deleteOrder(obj, order_id, func) {
		let request = obj.db.transaction(['orders'], 'readwrite')
			.objectStore('orders')
			.delete(order_id);
		request.onsuccess = function(event) {
			console.log('数据删除成功');
			func(obj);
		}
		request.onerror = function(event) {
			alert('数据删除失败');
		}
	}

	export function getAllUsers(db) {
		return db.transaction(['users'], 'readwrite')
			.objectStore('users').getAll();
	}

	export function getAllOrders(db) {
		return db.transaction(['orders'], 'readwrite')
			.objectStore('orders').getAll();
	}

	export function getUser(db, name) {
		return db.transaction(['users'], 'readwrite')
			.objectStore('users').get(name);
	}

	export function getOrder(db, id) {
		return db.transaction(['orders'], 'readwrite')
			.objectStore('orders').get(id);
	}
</script>

<style>
	.demo-tabs>.el-tabs__content {
		padding: 32px;
		color: #6b778c;
		font-size: 32px;
		font-weight: 600;
	}

	.demo-tabs .custom-tabs-label .el-icon {
		vertical-align: middle;
	}

	.demo-tabs .custom-tabs-label span {
		vertical-align: middle;
		margin-left: 4px;
	}
</style>
