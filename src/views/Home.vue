<template>
    <div class="Chart">
        <h1>Population Statistics</h1>
        <vs-row>
            <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
                <vSelect :clearable="false" @input="barData" v-model="selected" :options="dropdownOptions"></vSelect>
            </vs-col>
        </vs-row>
        <vs-row>
            <vs-col vs-type="flex" vs-w="5">
                <vs-table :data="data">
                    <template slot="thead">
                        <vs-th>
                            #
                        </vs-th>
                        <vs-th>
                            Division
                        </vs-th>
                        <vs-th>
                            Address
                        </vs-th>
                        <vs-th>
                            Population
                        </vs-th>
                        <vs-th>
                            Male
                        </vs-th>
                        <vs-th>
                            Female
                        </vs-th>
                    </template>

                    <template slot-scope="{data}">
                        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                            <vs-td :data="indextr + 1">
                                {{ indextr + 1 }}
                            </vs-td>
                            <vs-td :data="tr.address">
                                {{tr.address}}
                            </vs-td>
                            <vs-td :data="tr.address">
                                {{tr.address}}
                            </vs-td>
                            <vs-td :data="tr.population.total">
                                {{tr.population.total}}
                            </vs-td>
                            <vs-td :data="tr.population.male">
                                {{tr.population.male}}
                            </vs-td>
                            <vs-td :data="tr.population.female">
                                {{tr.population.female}}
                            </vs-td>
                        </vs-tr>
                    </template>
                </vs-table>
            </vs-col>
            <vs-col vs-type="flex" vs-w="7">
                <div class="chartArea w-full" v-if="barChart.init">
                    <div class="chartAreaWrapper">
                        <div class="chartWrapper">
                            <bar-chart :key="random" :height="options.height" :chart-data="barChart.data"
                                       :options="barChart.options"></bar-chart>
                        </div>
                    </div>
                </div>
            </vs-col>
        </vs-row>
    </div>
</template>
<script>
    import BarChart from "../components/charts/BarChart";
    import vSelect from 'vue-select'

    export default {
        components: {
            BarChart: BarChart,
            vSelect
        },
        mounted() {
            this.barData()
        },
        data: function () {
            return {
                selected: 'All',
                dropdownOptions: [
                    "All", "Dhaka", "Chittagong", "Rajshahi", "Khulna", "Sylhet", "Barisal", "Rangpur"
                ],
                colorSet: {
                    total: '#7367F0',
                    male: '#28C76F',
                    female: '#EA5455'
                },
                dataSets: [
                    {
                        address: 'Dhaka',
                        population: {
                            total: 20000000,
                            male: 11000000,
                            female: 9000000
                        }
                    },
                    {
                        address: "Chittagong",
                        population: {
                            total: 10000000,
                            male: 5500000,
                            female: 4500000
                        }
                    },
                    {
                        address: "Rajshahi",
                        population: {
                            total: 8000000,
                            male: 3800000,
                            female: 4200000
                        }
                    },
                    {
                        address: "Khulna",
                        population: {
                            total: 7500000,
                            male: 4000000,
                            female: 3500000
                        }
                    },
                    {
                        address: "Sylhet",
                        population: {
                            total: 7000000,
                            male: 3600000,
                            female: 3400000
                        }
                    },
                    {
                        address: "Barisal",
                        population: {
                            total: 6000000,
                            male: 3000000,
                            female: 3000000
                        }
                    },
                    {
                        address: "Rangpur",
                        population: {
                            total: 5000000,
                            male: 2700000,
                            female: 2300000
                        }
                    }
                ],
                random: Math.random(),
                barChart: {
                    init: false,
                    data: {
                        labels: [],
                        datasets: []
                    },
                    options: {
                        legend: {display: true},
                        title: {
                            display: true,
                            text: 'Population Statistics'
                        }
                    }
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            },
                            gridLines: {
                                display: true
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                beginAtZero: true
                            },
                            gridLines: {
                                display: false
                            }
                        }]
                    },
                    legend: {
                        display: false
                    },
                    tooltips: {
                        enabled: true,
                        mode: 'single',
                        callbacks: {
                            label: function (tooltipItems, data) {
                                return tooltipItems.yLabel;
                            }
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    height: 150,
                }
            }
        },
        computed: {
            data() {
                let datasets = [];
                if (this.selected === 'All') {
                    datasets = this.dataSets
                } else {
                    let data = this.dataSets.find(item => item.address === this.selected)
                    datasets.push(data);
                }
                return datasets;
            }
        },
        methods: {
            barData() {
                this.barChart.init = false;
                let datasets = this.data;
                let chartData = [
                    {label: "Total", backgroundColor: this.colorSet.total, data: []},
                    {label: "Male", backgroundColor: this.colorSet.male, data: []},
                    {label: "Female", backgroundColor: this.colorSet.female, data: []}
                ];
                let labels = [];
                datasets.forEach(item => {
                    labels.push(item.address);
                    chartData[0].data.push(item.population.total);
                    chartData[1].data.push(item.population.male);
                    chartData[2].data.push(item.population.female);
                });
                this.barChart.data.labels = labels;
                this.barChart.data.datasets = chartData;
                setTimeout(() => {
                    this.barChart.init = true;
                }, 500)
            },
        }
    }
</script>