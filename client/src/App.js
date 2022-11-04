import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_ALL_USERS, GET_ONE_USER } from "./query/user";
import "./App.css";
import { CREATE_USER } from "./mutations/user";

function App() {
    const [users, setUsers] = useState([]);
    const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
    const { data: oneUser, loading: loadingOneUser } = useQuery(GET_ONE_USER, {
        variables: {
            id: "1667561716944",
        },
    });

    const [newUser] = useMutation(CREATE_USER);

    const [username, setUsername] = useState("");
    const [age, setAge] = useState(0);

    console.log(oneUser);

    useEffect(() => {
        if (!loading) {
            setUsers(data.getAllUsers);
        }
    }, [data]);

    const addUser = (e) => {
        e.preventDefault();
        newUser({
            variables: {
                input: {
                    username,
                    age: +age,
                },
            },
        }).then(({ data }) => {
            console.log(data);
            setUsername("");
            setAge(0);
        });
    };

    const getAll = (e) => {
        e.preventDefault();
        refetch();
    };

    return (
        <div className="p-10 text-center bg-slate-500">
            <form action="#">
                <div className="flex gap-5 justify-center mb-5">
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        name="username"
                        className="h-7 p-4"
                    />
                    <input
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        type="number"
                        name="age"
                        className="h-7 p-4"
                    />
                </div>

                <div className="flex gap-5 justify-center mb-5">
                    <button
                        onClick={(e) => addUser(e)}
                        className="w-24 inline-flex justify-center rounded-md border border-transparent bg-orange-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Создать
                    </button>
                    <button
                        onClick={(e) => getAll(e)}
                        className="w-24 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Получить
                    </button>
                </div>
            </form>

            {loading ? (
                <h2>Loading...</h2>
            ) : (
                <div className="bg-white max-w-3xl m-auto">
                    {users.map((user) => (
                        <div className="h-10 flex items-center justify-center" key={user.id}>
                            {user.id}, {user.username}, {user.age}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;
