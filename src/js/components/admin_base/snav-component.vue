<script>
    export default {
        data(){
            return {
                currentTag: '0',
                menus: [
                    {
                        name: '首页',
                        url: '/index',
                        tag: '0',
                        hasExtend: false, //是否有二级菜单
                    },
                    {
                        name: '销售消息通知',
                        url: '/saleR',
                        tag: 'sale',
                        hasExtend: true, //是否有二级菜单
                        fold: true, //是否展开
                        extend: [
                            {
                                name: '待确认订单',
                                url: '/order/list/0?ordConfirmStatus=0',
                                tag: '1_1',
                            },
                            {
                                name: '待出库物流',
                                url: '/logistics/logisticsList/0',
                                tag: '1_2'
                            },
                            {
                                name: '待发货物流',
                                url: '/logistics/logisticsList/1',
                                tag: '1_3'
                            },
                            {
                                name: '待收货物流',
                                url: '/logistics/logisticsList/2',
                                tag: '1_4'
                            },
                            {
                                name: '待确认回款',
                                url: '/cash/cashList/0',
                                tag: '1_5'
                            },
                            {
                                name: '待开票申请',
                                url: '/invoice/invoiceWriteList/0',
                                tagIndex: '1_6'
                            }
                        ]
                    },
                    {
                        name: '销售管理',
                        url: '/workbench',
                        hasExtend: true, //是否有二级菜单
                        fold: true,  //是否展开
                        extend: [
                            {
                                name: '创建销售单',
                                url: '/order/create',
                                tag: '2_1'
                            },
                            {
                                name: '销售单管理',
                                url: '/order/list',
                                tag: '2_2'
                            },
                            {
                                name: '物流管理',
                                url: '/logistics/logisticsList',
                                tag: '2_3'
                            },
                            {
                                name: '回款管理',
                                url: '/cash/cashList',
                                tag: '2_4'
                            },
                            {
                                name: '开票管理',
                                url: '/invoice/invoiceWriteList',
                                tag: '2_9'
                            },
                            {
                                name: '票据管理',
                                url: '/invoice/invoiceManageList',
                                tag: '2_5'
                            },
                            {
                                name: '提成管理',
                                url: '/commission/commissionList',
                                tag: '2_6'
                            },
                            {
                                name: '提成设置',
                                url: '/commission/commissionSet',
                                tag: '2_7',
                            },
                            {
                                name: '合同管理',
                                url: '/contract/contractList',
                                tag: '2_8'
                            },
                        ]
                    },
                ],
            }
        },
    }
</script>

<template>
    <ul class="snav-menu" @click="show=false">
        <li v-for="(item,index) in menus" :class="{active:item.fold,hasextend:item.hasExtend}">
            <!--如果没有二级菜单-->
            <!--如果遍历到的标识等于当前的标识，就加上active类名，改变样式-->
            <!--点击事件为触发跳转路由，就比如点击‘首页’，就是跳转到‘首页’的对应的路由-->
            <a  v-if="!item.hasExtend" href="javascript:;" class="tit" @click="switchNav(item.url,item.tag)"
               :class="{active:item.tag==currentTag}">
                <em>{{item.name}}</em>
            </a>
            <!--如果有二级菜单-->
            <!--点击事件为触发子元素的显示或隐藏 比如点击‘销售消息通知’，就触发‘销售消息通知’下面子菜单的显示或者隐藏。如果显示就隐藏，隐藏就显示-->
            <a v-else href="javascript:;" class="tit" @click.stop="flod(index)">
                <em>{{item.name}}</em>
            </a>
            <!--如果有二级菜单，遍历子菜单-->
            <!--如果有二级菜单，并且fold属性为true（子菜单展开显示）。就加上active类名，改变样式-->
            <div class="extend-nav level2" v-if="item.hasExtend" :class="{active:item.fold}">
                <p v-for="(extend1,deep1) in item.extend">
                    <!--如果遍历到的标识等于当前的标识，就加上active类名，改变样式-->
                    <!--点击切换路由（页面的操作）-->
                    <a href="javascript:;" :class="{active:extend1.tag==currentTag}"
                       @click="switchNav(extend1.url,extend1.tag)">
                        <em>{{extend1.name}}</em>
                    </a>
                </p>
            </div>
        </li>
    </ul>
</template>

<style lang="scss">
    
    * {
        margin: 0;
        padding: 0;
    }
    em, i {
        font-style: normal;
    }
    .fr {
        float: right;
    }
    .mt15 {
        margin-top: 15px;
    }
    .mr30 {
        margin-right: 30px;
    }
    .clear {
        clear: both;
    }
    li {
        list-style-type: none;
    }
    a {
        text-decoration: none;
    }
</style>
