<script>
    import {Line} from 'vue-chartjs'

    export default {
        extends: Line,
        props: {
            data: {
                type: Object,
                default: null,
            },
            options: {
                type: Object,
                default: null,
            }
        },
        mounted() {
            this.renderChart(this.data, this.options)
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
