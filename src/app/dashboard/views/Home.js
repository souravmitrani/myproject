import { useFetch } from "../../../hooks/useFetch"
import { BalanceOvertime } from "../components/BalanceOvertime"
import { DashboardStatCard } from "../components/DashboardStatCard"
import { MonthlyExpenseBreakdown } from "../components/MonthlyExpenseBreakdown"
import { MonthlyIncomeExpenseBreakdown, MonthlyIncomeExpenseBreakdownd } from "../components/MonthlyIncomeExpenseBreakdown"
import { TrialEndCard } from "../components/TrialEndCard"


export const Home = () => {

    //income
    const { data: income, error: incomeError, loading: incomeLoading } = useFetch("/get-total-income")

    //expense
    const { data: expense, error: expenseError, loading: expenseLoading } = useFetch("/get-total-expense")

    //most spent category
    const { data: mostSpentCategory, error: mostSpentCategoryError, loading: mostSpentCategoryLoading } = useFetch("/get-most-spent-category")

    //least spent category
    const { data: leastSpentCategory, error: leastSpentCategoryError, loading: leastSpentCategoryLoading } = useFetch("/get-least-spent-category")

    //balance overtime
    const { data: monthlyIncomeExpense, error: monthlyIncomeExpenseError, loading: monthlyIncomeExpenseLoading } = useFetch("/get-monthly-income-expense-balance-breakdown")

    //montly category wise breakdown
    const { data: monthlyCategoryWiseBreakdown, error: monthlyCategoryWiseBreakdownError, loading: monthlyCategoryWiseBreakdownLoading } = useFetch("/get-monthly-category-wise-breakdown")

    //trial days

    const { data: trialPeriodDays, loading: trialPeriodDaysLoading } = useFetch("/get-trial-period-days")




    return (
        <>


            <div className="content-body">

                <div className="row">

                    <div className="col-12">

                        {!trialPeriodDaysLoading && trialPeriodDays?.trial_period_days !== null && <TrialEndCard days={trialPeriodDays?.trial_period_days} />}


                        <div className="page-title">
                            <h3>Dashboard</h3>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <DashboardStatCard data={income}
                        loading={incomeLoading}
                        error={incomeError}
                        title={"Total Income"}
                    />
                    <DashboardStatCard data={expense}
                        loading={expenseLoading}
                        error={expenseError}
                        title={"Total Expense"}
                    />
                    <DashboardStatCard category={mostSpentCategory?.category}
                        loading={mostSpentCategoryLoading}
                        error={mostSpentCategoryError}
                        title={"Most Spent Category"}
                    />
                    <DashboardStatCard category={leastSpentCategory?.category}
                        loading={leastSpentCategoryLoading}
                        error={leastSpentCategoryError}
                        title={"Least Spent Category"}
                    />
                    <BalanceOvertime data={monthlyIncomeExpense}
                        loading={monthlyIncomeExpenseLoading}
                        error={monthlyIncomeExpenseError}

                    />
                    <MonthlyExpenseBreakdown data={monthlyCategoryWiseBreakdown}
                        loading={monthlyCategoryWiseBreakdownLoading}
                        error={monthlyCategoryWiseBreakdownError}
                    />
                    <MonthlyIncomeExpenseBreakdown data={monthlyIncomeExpense}
                        loading={monthlyIncomeExpenseLoading}
                        error={monthlyIncomeExpenseError}
                    />
                </div>
            </div>
        </>

    )
}
