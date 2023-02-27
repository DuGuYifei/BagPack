import{u as e,r as l,E as t,o as r,c as o,w as a,a as s,b as i,d,e as n,f as u,g as c,h as f,i as m,j as p,k as h,l as b,m as g,n as _,t as y,F as V,p as w,q as C,s as U,v as k,x as D,y as x,z as O,A as F,B as v,C as S}from"./vendor.1713a6bb.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver((e=>{for(const t of e)if("childList"===t.type)for(const e of t.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&l(e)})).observe(document,{childList:!0,subtree:!0})}function l(e){if(e.ep)return;e.ep=!0;const l=function(e){const l={};return e.integrity&&(l.integrity=e.integrity),e.referrerpolicy&&(l.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?l.credentials="include":"anonymous"===e.crossorigin?l.credentials="omit":l.credentials="same-origin",l}(e);fetch(e.href,l)}}();const j={components:{UploadFilled:e},props:{refData:{required:!0}},data:()=>({fileVal:[]}),methods:{handleChange(e,l){let t=new FileReader;t.onload=e=>{let l=JSON.parse(e.target.result);l&&(this.refData.val=l)},t.readAsText(e.raw)}}},E=i("div",{class:"el-upload__text"},[d(" Drop file here or "),i("em",null,"click to upload")],-1),L=i("div",{class:"el-upload__tip"}," Use the exported file or write json/text by yourself. ",-1);j.render=function(e,i,d,u,c,f){const m=l("upload-filled"),p=n,h=t;return r(),o(h,{class:"upload-demo",drag:"","auto-upload":!1,"on-change":f.handleChange},{tip:a((()=>[L])),default:a((()=>[s(p,{class:"el-icon--upload"},{default:a((()=>[s(m)])),_:1}),E])),_:1},8,["on-change"])};var N={data:()=>({fileValue:{val:null},db:null,sortOrders:[{label:"降序",value:"descending"},{label:"升序",value:"ascending"}],search:"",filterTableData:[],userCreate:"",dialogFormVisible:!1,dialogFileVisible:!1,form:{name:"",deposit:0,increase:0,decrease:0,used:0}}),methods:{handleDelete(e){!function(e,l,t){let r=e.db.transaction(["users"],"readwrite").objectStore("users").delete(l);r.onsuccess=function(l){console.log("数据删除成功"),t(e)},r.onerror=function(e){alert("数据删除失败")}}(this,e,R)},handleCreate(){this.form.name="",this.form.deposit=0,this.form.increase=0,this.form.decrease=0,this.form.used=0,this.dialogFormVisible=!0},handleEdit(){let e={name:this.form.name,deposit:Number(this.form.deposit)+Number(this.form.increase)-Number(this.form.decrease),used:this.form.used};xe(this,e,R),this.search=e.name},handleExport(){let e=Fe(this.db);e.onsuccess=function(l){let t=[];t=e.result;!function(e,l,t){let r=new Blob([e],{type:l}),o=URL.createObjectURL(r),a=document.createElement("a");a.download=t,a.href=o,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(o)}(JSON.stringify(t),"application/json","users.json")},e.onerror=function(e){alert("数据导出失败")}},handleImport(){var e;e=this,this.fileValue.val.forEach((l=>{xe(e,l,R)}))}},mounted(){De(this,R)}};let T=[];class I{constructor(e,l){this.id=l,this.name=e.name,this.deposit=e.deposit,this.used=e.used,this.balance=e.deposit-e.used}}function R(e){let l=Fe(e.db);l.onsuccess=function(t){T=[];let r=1;l.result.forEach((e=>{T.push(new I(e,r++))})),e.filterTableData=u((()=>T.filter((l=>!e.search||l.name.toLowerCase().includes(e.search.toLowerCase())))))},l.onerror=function(e){alert("数据刷新失败")}}const M=d("Create"),z=d("Export"),B=d("Import"),J=d(" 编辑 "),A=d("删除"),P=d("   -   "),q={class:"dialog-footer"},Y=d("Cancel"),K=d(" Confirm "),G={class:"dialog-footer"},H=d("Cancel"),Q=d(" Confirm ");N.render=function(e,l,t,o,n,u){const w=c,C=f,U=m,k=p,D=h,x=b,O=g,F=j;return r(),_(V,null,[s(w,{type:"danger",onClick:l[0]||(l[0]=e=>u.handleCreate())},{default:a((()=>[M])),_:1}),s(w,{type:"danger",onClick:l[1]||(l[1]=e=>u.handleExport())},{default:a((()=>[z])),_:1}),s(w,{type:"danger",onClick:l[2]||(l[2]=e=>{n.dialogFileVisible=!0})},{default:a((()=>[B])),_:1}),s(k,{data:n.filterTableData,style:{width:"100%"},"default-sort":{prop:"id",order:"ascending"}},{default:a((()=>[s(C,{prop:"id",label:"id",width:"80"}),s(C,{prop:"name",label:"买家",width:"80",sortable:"","sort-orders":n.sortOrders},null,8,["sort-orders"]),s(C,{prop:"balance",label:"余额",width:"80"}),s(C,{prop:"used",label:"使用",width:"90"}),s(C,{prop:"deposit",label:"总存钱量",width:"90"}),s(C,{align:"center"},{header:a((()=>[s(U,{modelValue:n.search,"onUpdate:modelValue":l[3]||(l[3]=e=>n.search=e),size:"small",placeholder:"Type to search by user"},null,8,["modelValue"])])),default:a((e=>[s(w,{size:"small",onClick:l=>{n.dialogFormVisible=!0,n.form.name=e.row.name,n.form.deposit=e.row.deposit,n.form.used=e.row.used,n.form.increase=0,n.form.decrease=0}},{default:a((()=>[J])),_:2},1032,["onClick"]),s(w,{size:"small",type:"danger",onClick:l=>u.handleDelete(e.row.name)},{default:a((()=>[A])),_:2},1032,["onClick"])])),_:1})])),_:1},8,["data"]),s(O,{modelValue:n.dialogFormVisible,"onUpdate:modelValue":l[9]||(l[9]=e=>n.dialogFormVisible=e),title:"详情/编辑"},{footer:a((()=>[i("span",q,[s(w,{onClick:l[7]||(l[7]=e=>n.dialogFormVisible=!1)},{default:a((()=>[Y])),_:1}),s(w,{type:"primary",onClick:l[8]||(l[8]=e=>{n.dialogFormVisible=!1,u.handleEdit()})},{default:a((()=>[K])),_:1})])])),default:a((()=>[s(x,{model:n.form},{default:a((()=>[s(D,{label:"客户","label-width":"140px"},{default:a((()=>[s(U,{modelValue:n.form.name,"onUpdate:modelValue":l[4]||(l[4]=e=>n.form.name=e),autocomplete:"off",style:{width:"250px"}},null,8,["modelValue"])])),_:1}),s(D,{label:"总存钱数","label-width":"140px"},{default:a((()=>[d(y(n.form.deposit)+" +  ",1),s(U,{modelValue:n.form.increase,"onUpdate:modelValue":l[5]||(l[5]=e=>n.form.increase=e),autocomplete:"off",style:{width:"100px"}},null,8,["modelValue"]),P,s(U,{modelValue:n.form.decrease,"onUpdate:modelValue":l[6]||(l[6]=e=>n.form.decrease=e),autocomplete:"off",style:{width:"100px"}},null,8,["modelValue"])])),_:1})])),_:1},8,["model"])])),_:1},8,["modelValue"]),s(O,{modelValue:n.dialogFileVisible,"onUpdate:modelValue":l[12]||(l[12]=e=>n.dialogFileVisible=e),title:"Import data from file"},{footer:a((()=>[i("span",G,[s(w,{onClick:l[10]||(l[10]=e=>n.dialogFileVisible=!1)},{default:a((()=>[H])),_:1}),s(w,{type:"primary",onClick:l[11]||(l[11]=e=>{n.dialogFileVisible=!1,u.handleImport()})},{default:a((()=>[Q])),_:1})])])),default:a((()=>[s(F,{refData:n.fileValue},null,8,["refData"])])),_:1},8,["modelValue"])],64)};let W=[];var X={data:()=>({fileValue:{val:null},stages:["接单","订货","厂家接单","我收到","飘洋过海","寄出","买家收到(完成)"],db:null,sortOrders:[{label:"降序",value:"descending"},{label:"升序",value:"ascending"}],search:"",filterTableData:[],userCreate:"",dialogFormVisible:!1,dialogFileVisible:!1,form:{id:-1,user:"",bag:"",buy_price:0,sell_price:0,send_price:0,sender:"",benefit:0,stage:0,update:new Date,update_str:"",history:[]},calculateUsedOriginMoney:0,calculateUsedOriginUser:"",dialogDeleteVisible:!1,deleteId:-1,deleteRadio:0,deleteMoney:0,deleteUser:""}),methods:{handleDelete(){if(1==this.deleteRadio){let e=this,l=Se(this.db,this.deleteUser);l.onsuccess=function(t){let r=l.result;r.used-=e.deleteMoney,xe(e,r)},l.onerror=function(e){alert("原用户获取失败")}}!function(e,l,t){let r=e.db.transaction(["orders"],"readwrite").objectStore("orders").delete(l);r.onsuccess=function(l){console.log("数据删除成功"),t(e)},r.onerror=function(e){alert("数据删除失败")}}(this,this.deleteId,le)},handleCreate(){this.form.id=-1,this.form.user="",this.form.bag="",this.form.buy_price=0,this.form.sell_price=0,this.form.send_price=0,this.form.sender="",this.form.benefit=0,this.form.stage=0,this.form.update=new Date,this.form.history=[{stage:0,date:this.form.update}],this.form.update_str=this.dateToString(this.form.update),this.calculateUsedOriginMoney=0,this.calculateUsedOriginUser="",this.dialogFormVisible=!0},handleNext(e){let l=je(this.db,e),t=this;l.onsuccess=function(e){let r=l.result.history[l.result.history.length-1].stage;6!=r?(l.result.history.push({stage:Number(r)+1,date:new Date}),Oe(t,l.result,le)):alert("已完成了！")},l.onerror=function(e){alert("状态更新失败")}},showOrderDetail(){if(-1!=this.form.id){let e=je(this.db,Number(this.form.id)),l=this;e.onsuccess=function(t){l.form=new ee(e.result),l.calculateUsedOriginMoney=l.form.sell_price,l.calculateUsedOriginUser=l.form.user,l.dialogFormVisible=!0},e.onerror=function(e){alert("获取订单错误,不存在这个id的订单"),l.dialogFormVisible=!1}}},handleEdit(){let e=Se(this.db,this.form.user),l=this;e.onsuccess=function(t){if(void 0===e.result)return alert("该用户不存在, 请先创建该用户"),void(l.dialogFormVisible=!1);{l.form.stage!=l.form.history[l.form.history.length-1].stage&&l.form.history.push({stage:l.form.stage,date:new Date});let t={id:l.form.id,user:l.form.user,bag:l.form.bag,buy_price:l.form.buy_price,sell_price:l.form.sell_price,send_price:l.form.send_price,sender:l.form.sender,history:l.form.history};if(Oe(l,t,le),t.user!=l.calculateUsedOriginUser){let r=e.result;r.used+=t.sell_price,xe(l,r);let o=Se(l.db,l.calculateUsedOriginUser);o.onsuccess=function(e){let r=o.result;r.used-=t.sell_price,xe(l,r)},e.onerror=function(e){alert("原用户获取失败")}}else if(t.sell_price!=l.calculateUsedOriginMoney){let r=e.result;r.used-=l.calculateUsedOriginMoney-t.sell_price,xe(l,r)}l.search=t.user}},e.onerror=function(e){alert("用户获取失败")}},handleExport(){let e=ve(this.db);e.onsuccess=function(l){let t=[];t=e.result;!function(e,l,t){let r=new Blob([e],{type:l}),o=URL.createObjectURL(r),a=document.createElement("a");a.download=t,a.href=o,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(o)}(JSON.stringify(t),"application/json","orders.json")},e.onerror=function(e){alert("数据导出失败")}},handleImport(){var e;e=this,this.fileValue.val.forEach((l=>{Oe(e,l,le)}))},dateToString:e=>e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate()},mounted(){this.stages,De(this,le)}};const Z=["接单","订货","厂家接单","我收到","飘洋过海","寄出","买家收到(完成)"];class ${constructor(e,l){this.stage=e,this.date=new Date(l)}}class ee{constructor(e){this.history=[],this.id=e.id,this.user=e.user,this.bag=e.bag,this.buy_price=e.buy_price,this.sell_price=e.sell_price,this.send_price=e.send_price,this.sender=e.sender,this.benefit=e.sell_price-e.buy_price-e.send_price,this.stage=e.history[e.history.length-1].stage,this.stage_str=Z[e.history[e.history.length-1].stage],e.history.forEach((e=>{this.history.push(new $(e.stage,e.date))})),this.update=this.history[this.history.length-1].date,this.update_str=this.update.getFullYear()+"-"+(this.update.getMonth()+1)+"-"+this.update.getDate()}}function le(e){let l=ve(e.db);l.onsuccess=function(t){W=[],l.result.forEach((e=>{W.push(new ee(e))})),e.filterTableData=u((()=>W.filter((l=>!e.search||l.user.toLowerCase().includes(e.search.toLowerCase())||l.bag.toLowerCase().includes(e.search.toLowerCase())||l.sender.toLowerCase().includes(e.search.toLowerCase())||l.update_str.includes(e.search)))))},l.onerror=function(e){alert("数据刷新失败")}}const te=d("Create"),re=d("Export"),oe=d("Import"),ae=d(" 详情/编辑 "),se=d("新状态"),ie=d(" 删除 "),de=d(" 0 - 接单 1 - 订货 2 - 厂家接单 3 - 我收到 4 - 飘洋过海 5 - 寄出 6 - 买家收到(完成) "),ne=i("br",null,null,-1),ue=i("br",null,null,-1),ce=d(" 历史："),fe=i("br",null,null,-1),me={class:"dialog-footer"},pe=d("Cancel"),he=d(" Confirm "),be=d("否"),ge=d("是"),_e={class:"dialog-footer"},ye=d("Cancel"),Ve=d(" Confirm "),we={class:"dialog-footer"},Ce=d("Cancel"),Ue=d(" Confirm ");X.render=function(e,l,t,o,n,u){const k=c,D=f,x=m,O=p,F=h,v=b,S=g,E=w,L=C,N=j;return r(),_(V,null,[s(k,{type:"danger",onClick:l[0]||(l[0]=e=>u.handleCreate())},{default:a((()=>[te])),_:1}),s(k,{type:"danger",onClick:l[1]||(l[1]=e=>u.handleExport())},{default:a((()=>[re])),_:1}),s(k,{type:"danger",onClick:l[2]||(l[2]=e=>{n.dialogFileVisible=!0})},{default:a((()=>[oe])),_:1}),s(O,{data:n.filterTableData,style:{width:"100%"},"default-sort":{prop:"id",order:"descending"}},{default:a((()=>[s(D,{fixed:"",prop:"id",label:"id",width:"70",sortable:"","sort-orders":n.sortOrders},null,8,["sort-orders"]),s(D,{prop:"user",label:"买家",width:"80"}),s(D,{prop:"bag",label:"包名",width:"80"}),s(D,{prop:"stage_str",label:"状态",width:"120"}),s(D,{prop:"update_str",label:"最新更新日期",width:"135",sortable:"","sort-orders":n.sortOrders,"sort-by":"update"},null,8,["sort-orders"]),s(D,{prop:"benefit",label:"收入计算",width:"90",sortable:"","sort-orders":n.sortOrders},null,8,["sort-orders"]),s(D,{prop:"buy_price",label:"我卖价",width:"90",sortable:"","sort-orders":n.sortOrders},null,8,["sort-orders"]),s(D,{prop:"sell_price",label:"我买价",width:"90",sortable:"","sort-orders":n.sortOrders},null,8,["sort-orders"]),s(D,{prop:"sender",label:"快递员",width:"90",sortable:"","sort-orders":n.sortOrders},null,8,["sort-orders"]),s(D,{prop:"send_price",label:"快递费",width:"90",sortable:"","sort-orders":n.sortOrders},null,8,["sort-orders"]),s(D,{fixed:"right",align:"center",width:"250"},{header:a((()=>[s(x,{modelValue:n.search,"onUpdate:modelValue":l[3]||(l[3]=e=>n.search=e),size:"small",placeholder:"Type to search by buyer or bag or date or sender"},null,8,["modelValue"])])),default:a((e=>[s(k,{size:"small",onClick:l=>{n.form.id=e.row.id,u.showOrderDetail()}},{default:a((()=>[ae])),_:2},1032,["onClick"]),s(k,{size:"small",onClick:l=>u.handleNext(e.row.id)},{default:a((()=>[se])),_:2},1032,["onClick"]),s(k,{size:"small",type:"danger",onClick:l=>{n.deleteId=e.row.id,n.deleteMoney=e.row.sell_price,n.deleteUser=e.row.user,n.dialogDeleteVisible=!0}},{default:a((()=>[ie])),_:2},1032,["onClick"])])),_:1})])),_:1},8,["data"]),s(S,{modelValue:n.dialogFormVisible,"onUpdate:modelValue":l[13]||(l[13]=e=>n.dialogFormVisible=e),title:"详情/编辑"},{footer:a((()=>[i("span",me,[s(k,{onClick:l[11]||(l[11]=e=>n.dialogFormVisible=!1)},{default:a((()=>[pe])),_:1}),s(k,{type:"primary",onClick:l[12]||(l[12]=e=>{n.dialogFormVisible=!1,u.handleEdit()})},{default:a((()=>[he])),_:1})])])),default:a((()=>[s(v,{model:n.form},{default:a((()=>[de,ne,ue,s(F,{label:"买家","label-width":"140px"},{default:a((()=>[s(x,{modelValue:n.form.user,"onUpdate:modelValue":l[4]||(l[4]=e=>n.form.user=e),autocomplete:"off",style:{width:"300px"}},null,8,["modelValue"])])),_:1}),s(F,{label:"包名","label-width":"140px"},{default:a((()=>[s(x,{modelValue:n.form.bag,"onUpdate:modelValue":l[5]||(l[5]=e=>n.form.bag=e),autocomplete:"off",style:{width:"300px"}},null,8,["modelValue"])])),_:1}),s(F,{label:"我买价","label-width":"140px"},{default:a((()=>[s(x,{modelValue:n.form.buy_price,"onUpdate:modelValue":l[6]||(l[6]=e=>n.form.buy_price=e),autocomplete:"off",style:{width:"300px"}},null,8,["modelValue"])])),_:1}),s(F,{label:"我卖价","label-width":"140px"},{default:a((()=>[s(x,{modelValue:n.form.sell_price,"onUpdate:modelValue":l[7]||(l[7]=e=>n.form.sell_price=e),autocomplete:"off",style:{width:"300px"}},null,8,["modelValue"])])),_:1}),s(F,{label:"快递费","label-width":"140px"},{default:a((()=>[s(x,{modelValue:n.form.send_price,"onUpdate:modelValue":l[8]||(l[8]=e=>n.form.send_price=e),autocomplete:"off",style:{width:"300px"}},null,8,["modelValue"])])),_:1}),s(F,{label:"快递员","label-width":"140px"},{default:a((()=>[s(x,{modelValue:n.form.sender,"onUpdate:modelValue":l[9]||(l[9]=e=>n.form.sender=e),autocomplete:"off",style:{width:"300px"}},null,8,["modelValue"])])),_:1}),s(F,{label:"收益","label-width":"140px"},{default:a((()=>[d("   "+y(n.form.benefit),1)])),_:1}),s(F,{label:"当前状态","label-width":"140px"},{default:a((()=>[s(x,{modelValue:n.form.stage,"onUpdate:modelValue":l[10]||(l[10]=e=>n.form.stage=e),autocomplete:"off",style:{width:"300px"}},null,8,["modelValue"]),d("    更新时间 "+y(n.form.update_str),1)])),_:1}),i("p",null,[ce,fe,(r(!0),_(V,null,U(n.form.history,(e=>(r(),_("label",null,y(n.stages[e.stage])+" = "+y(u.dateToString(e.date))+"   ",1)))),256))])])),_:1},8,["model"])])),_:1},8,["modelValue"]),s(S,{modelValue:n.dialogDeleteVisible,"onUpdate:modelValue":l[17]||(l[17]=e=>n.dialogDeleteVisible=e),title:"是否还原金额到该买家账户"},{footer:a((()=>[i("span",_e,[s(k,{onClick:l[15]||(l[15]=e=>n.dialogDeleteVisible=!1)},{default:a((()=>[ye])),_:1}),s(k,{type:"primary",onClick:l[16]||(l[16]=e=>{n.dialogDeleteVisible=!1,u.handleDelete()})},{default:a((()=>[Ve])),_:1})])])),default:a((()=>[s(v,{model:n.form},{default:a((()=>[s(F,{"label-width":"140px"},{default:a((()=>[s(L,{modelValue:n.deleteRadio,"onUpdate:modelValue":l[14]||(l[14]=e=>n.deleteRadio=e)},{default:a((()=>[s(E,{label:0},{default:a((()=>[be])),_:1}),s(E,{label:1},{default:a((()=>[ge])),_:1})])),_:1},8,["modelValue"])])),_:1})])),_:1},8,["model"])])),_:1},8,["modelValue"]),s(S,{modelValue:n.dialogFileVisible,"onUpdate:modelValue":l[20]||(l[20]=e=>n.dialogFileVisible=e),title:"Import data from file"},{footer:a((()=>[i("span",we,[s(k,{onClick:l[18]||(l[18]=e=>n.dialogFileVisible=!1)},{default:a((()=>[Ce])),_:1}),s(k,{type:"primary",onClick:l[19]||(l[19]=e=>{n.dialogFileVisible=!1,u.handleImport()})},{default:a((()=>[Ue])),_:1})])])),default:a((()=>[s(N,{refData:n.fileValue},null,8,["refData"])])),_:1},8,["modelValue"])],64)};const ke={data:()=>({sumDeposit:0,sumBenefit:0,activeName:"order"}),components:{Suitcase:k,User:D,CreditCard:x},methods:{handleTabClick(e,l){var t;2==e.index&&((t=this).sumBenefit=0,W.forEach((e=>t.sumBenefit+=e.benefit)),function(e){e.sumDeposit=0,T.forEach((l=>e.sumDeposit+=l.balance)),console.log(e.sumDeposit)}(this))}}};function De(e,l){let t=indexedDB.open("bagPack",1);t.onsuccess=function(t){e.db=t.target.result,l&&l(e)},t.onerror=function(e){console.log("Database error: "+e.target.errorCode)},t.onupgradeneeded=function(l){e.db=l.target.result,e.db.createObjectStore("orders",{keyPath:"id",autoIncrement:!0}),e.db.createObjectStore("users",{keyPath:"name"})}}function xe(e,l,t){let r=e.db.transaction(["users"],"readwrite").objectStore("users").put({name:l.name,deposit:l.deposit,used:l.used});r.onsuccess=function(l){console.log("数据写入成功"),t?t(e):location.reload()},r.onerror=function(e){alert("数据写入失败")}}function Oe(e,l,t){if(-1==l.id){let r=e.db.transaction(["orders"],"readwrite").objectStore("orders").put({user:l.user,bag:l.bag,buy_price:l.buy_price,sell_price:l.sell_price,send_price:l.send_price,sender:l.sender,history:JSON.parse(JSON.stringify(l.history))});return r.onsuccess=function(l){console.log("数据写入成功"),t(e)},void(r.onerror=function(e){alert("数据写入失败")})}let r=e.db.transaction(["orders"],"readwrite").objectStore("orders").put({id:l.id,user:l.user,bag:l.bag,buy_price:l.buy_price,sell_price:l.sell_price,send_price:l.send_price,sender:l.sender,history:JSON.parse(JSON.stringify(l.history))});r.onsuccess=function(l){console.log("数据写入成功"),t(e)},r.onerror=function(e){alert("数据写入失败")}}function Fe(e){return e.transaction(["users"],"readwrite").objectStore("users").getAll()}function ve(e){return e.transaction(["orders"],"readwrite").objectStore("orders").getAll()}function Se(e,l){return e.transaction(["users"],"readwrite").objectStore("users").get(l)}function je(e,l){return e.transaction(["orders"],"readwrite").objectStore("orders").get(l)}const Ee={class:"custom-tabs-label"},Le=i("span",null,"Orders",-1),Ne={class:"custom-tabs-label"},Te=i("span",null,"Users",-1),Ie={class:"custom-tabs-label"},Re=i("span",null,"Me",-1),Me=i("br",null,null,-1),ze=i("p",{style:{"font-size":"10px"}},[d(" 金额计算: "),i("br"),d(" 1. 订单的“我卖价”会自动扣除到对应买家的个人存款上 "),i("br"),d(" 2. 我的总存款 = 所有买家的余额 （所以这里不包含收益） "),i("br"),d(" 3. 我的总收益 = 所有订单的收益 （所以删除的订单，收益就会消失） ")],-1);ke.render=function(e,t,u,c,f,m){const p=l("Suitcase"),h=n,b=X,g=O,_=l("User"),V=N,w=l("CreditCard"),C=F,U=v;return r(),o(U,{type:"border-card",class:"demo-tabs",modelValue:f.activeName,"onUpdate:modelValue":t[2]||(t[2]=e=>f.activeName=e),onTabClick:m.handleTabClick},{default:a((()=>[s(g,{name:"order"},{label:a((()=>[i("span",Ee,[s(h,null,{default:a((()=>[s(p)])),_:1}),Le])])),default:a((()=>[s(b)])),_:1}),s(g,{name:"user"},{label:a((()=>[i("span",Ne,[s(h,null,{default:a((()=>[s(_)])),_:1}),Te])])),default:a((()=>[s(V)])),_:1}),s(g,{name:"me"},{label:a((()=>[i("span",Ie,[s(h,null,{default:a((()=>[s(w)])),_:1}),Re])])),default:a((()=>[s(C,{class:"ml-2",type:"info",size:"large",modelValue:f.sumDeposit,"onUpdate:modelValue":t[0]||(t[0]=e=>f.sumDeposit=e)},{default:a((()=>[d("总存款: "+y(f.sumDeposit),1)])),_:1},8,["modelValue"]),Me,s(C,{class:"ml-2",type:"info",size:"large",modelValue:f.sumBenefit,"onUpdate:modelValue":t[1]||(t[1]=e=>f.sumBenefit=e)},{default:a((()=>[d("总收益: "+y(f.sumBenefit),1)])),_:1},8,["modelValue"]),ze])),_:1})])),_:1},8,["modelValue","onTabClick"])};S({setup:e=>(e,l)=>(r(),o(ke))}).mount("#app");
