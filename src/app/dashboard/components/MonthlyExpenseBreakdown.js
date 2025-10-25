import { ResponseHandler } from "../../../components/ResponseHandler"


export const MonthlyExpenseBreakdown = ({ loading, error, data }) => {
    console.log(data)

    const renderChart = () => {
        return (
            <>
                <div className="progress-stacked">
                    {
                        data && data.map(item => {
                            return (
                                <div className="progress" style={{ width: `${item.percentage.toFixed(2)}%` }}>
                                    <div className="progress-bar" style={{ background: `#${item.category.color}` }}></div>
                                </div>
                            )
                        })
                    }

                </div>
                <div className="list-1 mt-3">
                    <ul>
                        {
                            data && data.map(item => {
                                return (
                                    <li>
                                        <p className="mb-0"><i className="ri-circle-fill" style={{ color: `#${item.category.color}` }}></i>{item.category.name}</p>
                                        <h5 className="mb-0"><span>{item.category_amount}</span>{item.percentage.toFixed(2)}%</h5>
                                    </li>
                                )
                            })
                        }

                    </ul>
                </div>
                
            </>
        )
    }

    return (
        <div className=" col-xxl-4 col-xl-4 col-lg-6 col-md-12">
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">MonthlyExpenseBreakdown</h4>
                </div>
                <div className="card-body">
                    <ResponseHandler error={error}
                        loading={loading}
                        dataToRender={renderChart}
                    />
                </div>
            </div>
        </div>
    )
}


