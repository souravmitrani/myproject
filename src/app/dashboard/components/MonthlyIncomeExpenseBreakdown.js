import { Bar, Line } from "react-chartjs-2";
import { ResponseHandler } from "../../../components/ResponseHandler";

export const MonthlyIncomeExpenseBreakdown = ({error,loading,data}) => {
    const balance = [];
    const labels = [];
    const income = [];
    const expense = [];

    

    data && data.map((item) => {
        balance.push(item?.monthly_balance)
        labels.push(item.label)
        income.push(item?.total_income)
        expense.push(item?.total_expense)
    })

    const renderChart = () => {
        return(
            <div>
                <Bar data={{
                    labels:labels,
                    datasets:[{
                        data:income,
                        backgroundColor:"lightblue",
                        borderColor:"lightblue",
                        borderWidth:2,
                        
                    },{
                         data:expense,
                        backgroundColor:"blue",
                        borderColor:"blue",
                        borderWidth:2,
                       
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
           <div className={"col-md-12"}>
               <div className="card">
                   <div className="card-header">
                       <h4 className="card-title">
                           MonthlyIncomeExpenseBreakdown
                       </h4>
   
                   </div>
                   <div className="card-body">
                       <ResponseHandler loading={loading} error={error} dataToRender={renderChart}/>
                   </div>
   
               </div>
   
           </div>
       )
}