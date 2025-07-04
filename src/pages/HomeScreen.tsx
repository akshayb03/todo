/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { v4 as uuidv4 } from "uuid";
import deleteIcon from "../assets/delete-icon.png";

const tasks = [
  {
    id: 1,
    title: "Buy groceries",
    description: "Milk, eggs, bread",
    deadline: 1720000000000,
    status: "ongoing",
    createdAt: 1719900000000,
    updatedAt: 1719900000000,
  },
];

const HomeScreen = () => {
  const [taskList, setTaskList] = useState(tasks);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createTask = () => {
    setIsModalOpen(true);
  };

  const onDelete = (task: any) => {
    const updatedList = taskList.filter((item) => item.id !== task.id);
    setTaskList(updatedList);
  };

  const onAdd = (obj: any) => {
    setTaskList((prev) => [
      ...prev,
      { ...obj, createdAt: Date.now(), updatedAt: Date.now(), id: uuidv4() },
    ]);
  };

  const changeStatus = (updatedTask: any) => {
    const updatedList = taskList.map((task) =>
      task.id === updatedTask.id ? { ...task, status: "success" } : task
    );
    setTaskList(updatedList);
  };

  useEffect(() => {
    setTaskList((prev) =>
      prev.map((task) => {
        if (task.status === "ongoing" && Date.now() > task.deadline) {
          return { ...task, status: "failure" };
        }
        return task;
      })
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaskList((prev) =>
        prev.map((task) => {
          if (task.status === "ongoing" && Date.now() > task.deadline) {
            return { ...task, status: "failure" };
          }
          return task;
        })
      );
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#EEEFE0",
      }}
    >
      <div
        style={{
          height: 80,
          width: "100%",
          backgroundColor: "#A7C1A8",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginBottom: 100,
        }}
      >
        <button onClick={createTask} style={{ height: 50, marginRight: 32 }}>
          Create Task
        </button>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "80%",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              width: "30%",
              height: 500,
              border: "1px solid black",
              color: "black",
              overflowY: "auto",
            }}
          >
            {taskList.filter((item) => item.status === "ongoing").length ===
            0 ? (
              <p
                style={{
                  textAlign: "center",
                  opacity: 0.6,
                  fontStyle: "italic",
                  fontSize: 12,
                  marginTop: 12,
                }}
              >
                No tasks created!
              </p>
            ) : (
              taskList
                .filter((item) => item.status === "ongoing")
                .map((tasks) => {
                  return (
                    <div
                      key={tasks.id}
                      style={{
                        backgroundColor: "#F1BA88",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 8,
                        marginBottom: 8,
                      }}
                    >
                      <div>
                        <h3>{tasks.title}</h3>
                        <p style={{ fontSize: 12 }}>{tasks.description}</p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <button
                          onClick={() => changeStatus(tasks)}
                          style={{
                            padding: "4px 8px",
                            fontSize: 12,
                            backgroundColor: "#4CAF50",
                            color: "white",
                            border: "none",
                            borderRadius: 4,
                            cursor: "pointer",
                            marginRight: 12,
                          }}
                        >
                          Mark as Done
                        </button>
                        <img
                          src={deleteIcon}
                          alt="Logo"
                          width={18}
                          height={18}
                          onClick={() => onDelete(tasks)}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    </div>
                  );
                })
            )}
          </div>
          <div
            style={{
              width: "30%",
              height: 500,
              border: "1px solid black",
              color: "black",
              overflowY: "auto",
            }}
          >
            {taskList.filter((item) => item.status === "success").length ===
            0 ? (
              <p
                style={{
                  textAlign: "center",
                  opacity: 0.6,
                  fontStyle: "italic",
                  fontSize: 12,
                  marginTop: 12,
                }}
              >
                Empty list!
              </p>
            ) : (
              taskList
                .filter((item) => item.status === "success")
                .map((tasks) => {
                  return (
                    <div
                      key={tasks.id}
                      style={{
                        backgroundColor: "#83F28F",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 8,
                        marginBottom: 8,
                      }}
                    >
                      <div>
                        <h3>{tasks.title}</h3>
                        <p style={{ fontSize: 12 }}>{tasks.description}</p>
                      </div>
                      <button
                        disabled
                        style={{
                          padding: "4px 8px",
                          fontSize: 12,
                          backgroundColor: "black",
                          color: "white",
                          border: "none",
                          borderRadius: 4,
                          cursor: "pointer",
                          marginRight: 12,
                        }}
                      >
                        Completed
                      </button>
                    </div>
                  );
                })
            )}
          </div>
          <div
            style={{
              width: "30%",
              border: "1px solid black",
              color: "black",
              height: 500,
              overflowY: "auto",
            }}
          >
            {taskList.filter((item) => item.status === "failure").length ===
            0 ? (
              <p
                style={{
                  textAlign: "center",
                  opacity: 0.6,
                  fontStyle: "italic",
                  fontSize: 12,
                  marginTop: 12,
                }}
              >
                No failed tasks!
              </p>
            ) : (
              taskList
                .filter((item) => item.status === "failure")
                .map((tasks) => {
                  return (
                    <div
                      key={tasks.id}
                      style={{
                        backgroundColor: "#F94449",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 8,
                        marginBottom: 8,
                      }}
                    >
                      <div>
                        <h3>{tasks.title}</h3>
                        <p style={{ fontSize: 12 }}>{tasks.description}</p>
                      </div>
                      <button
                        disabled
                        style={{
                          padding: "4px 8px",
                          fontSize: 12,
                          backgroundColor: "black",
                          color: "white",
                          border: "none",
                          borderRadius: 4,
                          cursor: "pointer",
                          marginRight: 12,
                        }}
                      >
                        Failed
                      </button>
                    </div>
                  );
                })
            )}
          </div>
        </div>
      </div>
      {isModalOpen ? (
        <Modal setIsModalOpen={setIsModalOpen} onAdd={onAdd} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default HomeScreen;
