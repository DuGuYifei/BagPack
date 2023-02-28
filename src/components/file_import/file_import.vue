<template>
	<el-upload class="upload-demo" drag :auto-upload="false" :on-change="handleChange">
		<el-icon class="el-icon--upload">
			<upload-filled />
		</el-icon>
		<div class="el-upload__text">
			Drop file here or <em>click to upload</em>
		</div>
		<template #tip>
			<div class="el-upload__tip">
				Use the exported file or write json/text by yourself.
			</div>
		</template>
	</el-upload>
</template>

<script>
	import {
		UploadFilled
	} from '@element-plus/icons-vue';

	export default {
		components: {
			UploadFilled,
		},
		props: {
			refData: {
				required: true
			},
		},
		data(){
			return {
				fileVal: []
			}
		},
		methods: {
			handleChange(file, fileList) {
				const reader = new FileReader();
				reader.onload = (event) => {
					try {
						const jsonData = JSON.parse(event.target.result);
						this.refData.val = jsonData;
					} catch (e) {
						console.log(`File Import Error: ${e}`)
					}
				};
				reader.readAsText(file.raw);
			}
		}
	}
</script>

<style>
</style>
