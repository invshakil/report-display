<script>
    import {Bar, mixins} from 'vue-chartjs'

    const {reactiveProp} = mixins;
    export default {
        extends: Bar,
        mixins: [reactiveProp],
        mounted() {
            this.renderChart(this.chartData, this.options)
        },
        data() {
            return {
                defaultOptions: {
                    responsive: true, // my new default options
                    maintainAspectRatio: false, // my new default options
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            },
                            gridLines: {
                                display: true // my new default options
                            }
                        }],
                        xAxes: [{
                            gridLines: {
                                display: false
                            }
                        }]
                    }
                }
            }
        },

    }
</script>
