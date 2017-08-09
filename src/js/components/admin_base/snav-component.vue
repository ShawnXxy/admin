<script>
    export default {
        data() {
            return {
                currentTag: '0',
                menus: [
                    {
                        name: 'Home',
                        url: '/index',
                        tag: '0',
                        hasExtend: false, //if has dropdown menu
                    },
                    {
                        name: 'sales notification',
                        url: '/saleR',
                        tag: 'sale',
                        hasExtend: true, //if has dropdown menu
                        fold: true, //toggle?
                        extend: [
                            {
                                name: 'Pending Confirmation', //待确认订单
                                url: '/order/list/0?ordConfirmStatus=0',
                                tag: '1_1',
                            },
                            {
                                name: 'Pending Packaging', //'待出库物流',
                                url: '/logistics/logisticsList/0',
                                tag: '1_2'
                            },
                            {
                                name: 'Pending Shipping', //'待发货物流',
                                url: '/logistics/logisticsList/1',
                                tag: '1_3'
                            },
                            {
                                name: 'Pending Receipt', //'待收货物流',
                                url: '/logistics/logisticsList/2',
                                tag: '1_4'
                            },
                            {
                                name: 'Pending Payment', //'待确认回款',
                                url: '/cash/cashList/0',
                                tag: '1_5'
                            },
                            {
                                name: 'Pending Request', //'待开票申请',
                                url: '/invoice/invoiceWriteList/0',
                                tagIndex: '1_6'
                            }
                        ]
                    },
                    {
                        name: 'Sales Management',
                        url: '/workbench',
                        hasExtend: true, //if has dropdown menu
                        fold: true,  // toggle
                        extend: [
                            {
                                name: 'Create Orders', //'创建销售单',
                                url: '/order/create',
                                tag: '2_1'
                            },
                            {
                                name: 'Orders Management', //'销售单管理',
                                url: '/order/list',
                                tag: '2_2'
                            },
                            {
                                name: 'Logistics', //'物流管理',
                                url: '/logistics/logisticsList',
                                tag: '2_3'
                            },
                            {
                                name: 'Payments', //'回款管理',
                                url: '/cash/cashList',
                                tag: '2_4'
                            },
                            {
                                name: 'Invoice', //'开票管理',
                                url: '/invoice/invoiceWriteList',
                                tag: '2_9'
                            },
                            {
                                name: 'Bills', //'票据管理',
                                url: '/invoice/invoiceManageList',
                                tag: '2_5'
                            },
                            {
                                name: 'Commission', //'提成管理',
                                url: '/commission/commissionList',
                                tag: '2_6'
                            },
                            {
                                name: 'Settings', //'提成设置',
                                url: '/commission/commissionSet',
                                tag: '2_7',
                            },
                            {
                                name: 'Contarct', //'合同管理',
                                url: '/contract/contractList',
                                tag: '2_8'
                            },
                        ]
                    },
                ],
            }
        },
        methods: {
            switchNav(url,tag) {
                this.currentTag = tag;
                this.$router.push({
                    'path': url,
                    'query': {
                        "tag": tag
                    }
                });
            },
            fold(index) {
                this.menus[index].fold = !this.menus[index].fold;
            }
        },
    }
</script>

<template>
    <ul class="snav-menu" @click="show=false">
        <li v-for="(item,index) in menus" :class="{active:item.fold,hasextend:item.hasExtend}">
            <!--if no dropdown menu-->
            <!--if iterated tag is current tag, make the tag active and change style-->
            <!--make click event redirect to routered page-->
            <a  v-if="!item.hasExtend" href="javascript:;" class="tit" @click="switchNav(item.url,item.tag)"
               :class="{active:item.tag==currentTag}">
                <em>{{item.name}}</em>
            </a>
            <!--if has dropdown menu-->
            <!--make click event to show'hide dropdown menu-->
            <a v-else href="javascript:;" class="tit" @click.stop="fold(index)">
                <em>{{item.name}}</em>
            </a>
            <!--if has dropdown menu, iterate all child menu-->
            <!--if has dropdown menu and menu toggled, make menu active and change style-->
            <div class="extend-nav level2" v-if="item.hasExtend" :class="{active:item.fold}">
                <p v-for="(extend1,deep1) in item.extend">
                    <!--if iterated tag is current tag, make the tag active and change style-->
                    <!--make click event redirect to routered page-->
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
    html,body,.zyl-admin-bd,.zyl-admin-wrap {
        width: 100%;
        height: 100%;
    }
    .zyl-admin-wrap{
        position: fixed;
    }
    .zyl-admin-snav {
        position: fixed;
        z-index: 1;
        width: 210px;
        height: 100%;
        overflow-y: auto;
        background: #2a3542;
        box-shadow: 3px 0 30px rgba(0, 0, 0, .2);
        &::-webkit-scrollbar {
            width: 5px;
            height: 100%;
            border-radius: 2px;
            background: #424448;
        }
        &::-webkit-scrollbar-thumb {
            background: #A2A2A2;
            border-radius: 2px;
        }
        .snav-menu {
            margin-top: 10px;
            > li {
                margin:0 10px 10px 10px;
                &.hasextend {
                    .tit {
                        background: #35404d;
                    }
                }
                &.active {
                    background: #35404d;
                    border-radius: 4px;
                    overflow: hidden;
                    .tit {
                        background: #475669 !important;
                        .icon-options-unfold {
                            display: none;
                        }
                        .icon-options-fold {
                            display: inline-block;
                        }
                    }
                    .extend-nav {
                        display: block;
                    }

                }
                .tit {
                    line-height: 22px;
                    color: #aeb2b7;
                    text-decoration: none;
                    display: block;
                    padding: 5px 0 5px 10px;
                    font-size: 12px;
                    outline: none;
                    transition: all 0.3s ease;
                    &:hover, &.active {
                        background: #35404d;
                        color: #fff;
                        em {
                            color: #FF6C60;
                        }
                    }
                    em {
                        display: inline-block;
                        vertical-align: middle;
                        font-style: normal;
                    }
                }
                .extend-nav {
                    display: none;
                    &.active {
                        display: block;
                    }
                    p {
                        position: relative;
                        a {
                            display: block;
                            font-size: 12px;
                            padding: 6px 0;
                            line-height: 25px;
                            height: 25px;
                            color: #aeb2b7;
                            text-decoration: none;
                            transition: all 0.3s ease;
                            text-indent: 40px;
                            &:hover, &.active {
                                color: #FF6C60;
                                background: #2e3844;
                                .icon-arrow {
                                    display: inline-block;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    .zyl-admin-content {
        height: 100%;
        margin-left: 210px;
        overflow-y: auto;
        &::-webkit-scrollbar {
            width: 5px;
            height: 100%;
            border-radius: 2px;
            background: #424448;
        }
        &::-webkit-scrollbar-thumb {
            background: #A2A2A2;
            border-radius: 2px;
        }
        .wrapper {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            &::-webkit-scrollbar {
                width: 5px;
                height: 100%;
                border-radius: 2px;
                background: #424448;
            }
            &::-webkit-scrollbar-thumb {
                background: #A2A2A2;
                border-radius: 2px;
            }
        }
    }
</style>
