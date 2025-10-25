import { Line } from "react-chartjs-2";
import { ResponseHandler } from "../../../components/ResponseHandler";

export const BalanceOvertime = ({error,loading,data}) => {
    const balance = [];
    const labels = [];

    data && data.map((item) => {
        balance.push(item?.monthly_balance)
        labels.push(item.label)
    })

    const renderChart = () => {
        return(
            <div>
                <Line data={{
                    labels:labels,
                    datasets:[{
                        data:balance,
                        backgroundColor:"red",
                        borderColor:"red",
                        borderWidth:2,
                        pointBackgroundColor:"red",
                        pointRadius:5,
                        pointHoverRadius:7,
                        pointHoverBackgroundColor:"#fff",
                        pointHoverBorderColor:"red",
                    }]
                }} options={{
                    plugins:{
                        legend:{
                            display:false
                        }
                    },
                    scales:{
                        x:{
                            grid:{
                                display:false
                            }
                        },
                         y:{
                            grid:{
                                display:false
                            }
                        }

                    }
                }}
                
                />
            </div>
        )
    }

   return(
           <div className={"col-md-8"}>
               <div className="card">
                   <div className="card-header">
                       <h4 className="card-title">
                           Balance Overtime
                       </h4>
   
                   </div>
                   <div className="card-body">
                       <ResponseHandler loading={loading} error={error} dataToRender={renderChart}/>
                   </div>
   
               </div>
   
           </div>
       )
}