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
    remTime: 0,
  },
];

const HomeScreen = () => {
  const [taskList, setTaskList] = useState(tasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = window.innerWidth < 768;

  const formatRemainingTime = (ms: number) => {
    if (isNaN(ms)) return "--";
    const totalSeconds = Math.floor(ms / 1000);

    const days = Math.floor(totalSeconds / (3600 * 24));
    if (days > 0) return `${days} days`;

    const hours = Math.floor(totalSeconds / 3600);
    if (hours > 0) return `${hours} hrs`;

    const minutes = Math.floor(totalSeconds / 60);
    if (minutes > 0) return `${minutes} mins`;

    return `${totalSeconds} sec`;
  };

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
        return {
          ...task,
          remTime:
            task.deadline - Date.now() > 0 ? task.deadline - Date.now() : 0,
        };
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
          return {
            ...task,
            remTime:
              task.deadline - Date.now() > 0 ? task.deadline - Date.now() : 0,
          };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "#EEEFE0",
        paddingBottom: isMobile ? 100 : 0,
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
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div
            style={{
              flex: isMobile ? "1 1 100%" : "1 1 30%",
              maxWidth: isMobile ? "100%" : "30%",
              height: isMobile ? 300 : 500,
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
                        <p style={{ fontSize: 10, fontWeight: 600 }}>
                          {formatRemainingTime(tasks.remTime)} remaining
                        </p>
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
              flex: isMobile ? "1 1 100%" : "1 1 30%",
              maxWidth: isMobile ? "100%" : "30%",
              height: isMobile ? 300 : 500,
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
                        padding: 16,
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
              flex: isMobile ? "1 1 100%" : "1 1 30%",
              maxWidth: isMobile ? "100%" : "30%",
              height: isMobile ? 300 : 500,
              border: "1px solid black",
              color: "black",
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
                        padding: 16,
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
