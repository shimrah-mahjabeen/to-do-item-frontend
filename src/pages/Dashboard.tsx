import TodoCard from '../components/TodoCard'
import CreateTodo from '../components/CreateTodo'

function Dashboard() {
    return (
        <>
            <CreateTodo />
            <TodoCard />
        </>
    )
}

export default Dashboard