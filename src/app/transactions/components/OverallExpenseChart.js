import { Doughnut } from "react-chartjs-2"
import { ResponseHandler } from "../../../components/ResponseHandler"

export const OverallExpenseChart =({loading,data,error}) => {
    const labels = []
    const colors = []
    const amount = []

    data && data.map((item) => {
        labels.push(item.category?.name)
        colors.push(`#${item.category?.color}`)
        amount.push(item.category_amount)


    })

    const renderChart = () => {
        return (
            <>
                <div>
                    <Doughnut style={{height:"10rem"}} data={{
                        labels:labels,
                        datasets:[{
                            data:amount,
                            backgroundColor:colors,
                        }]
                    }
                        
                    }
                    options={{
                        maintainAspectRatio:false,
                        cutout:50,
                        plugins:{
                            legend:{
                                display:false
                            }
                        }
                    }}
                    />


                </div>

                <div className={"list-1 mt-3"}>
                    <ul>
                        {
                            data &&data.map((item)=>{
                                return(
                                    <li>
                                        <p className="mb-0"><i className="ri-circle-fill" style={{color: `#${item.category.color}`}}></i>{item.category?.name}</p>
                                        <h5 className="mb-0"><span>₹{item.category_amount}</span>{item.percentage.toFixed(2)}%</h5>
                                    </li>
                                )
                            })
                        }
                    </ul>

                </div>
            </>
        )
    }

    return(
        //<div className={"col-md-4"}>
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">
                        Expense Breakdown
                    </h4>

                </div>
                <div className="card-body">
                    <ResponseHandler loading={loading} error={error} dataToRender={renderChart}/>
                </div>

            </div>

        //</div>
    )


}