<template>
    <div class="page-cash-list">
        <div class="cash-title">
            <span>Payments</span>
        </div>
        <div class="cash-search">
            <span class="fs14 mr15">Sort:</span>
            <el-button type="primary" size="small" icon="search"></el-button>
            <el-button type="danger" size="small">Reset</el-button>
        </div>
        <div class="cash-table">
            <el-table :data="cashList" border style="width: 100%" hightlight-current-row>
                <el-table-column label="index" width="180">
                    <template scope="scope">
                        <a href="javascript:;">{{scope.row.cashId}}</a>
                    </template>
                </el-table-column>

                <el-table-column label="customers" width="200">
                    <template scope="scope">
                        <span>{{scope.row.custoName}}</span>
                    </template>
                </el-table-column>

            </el-table>
        </div>
    </div>
</template>
