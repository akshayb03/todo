/* eslint-disable @typescript-eslint/no-explicit-any */
import DatePicker from "react-datepicker";
import crossIcon from "../assets/cross-icon.png";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const Modal = ({
  setIsModalOpen,
  onAdd,
}: {
  setIsModalOpen: (flag: boolean) => void;
  onAdd: any;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div
      style={{
        position: "absolute",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        zIndex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(0,0,0,0.6)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        style={{
          width: 400,
          height: 400,
          backgroundColor: "#A7C1A8",
          borderRadius: 40,
          display: "flex",
          flexDirection: "column",
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ color: "black" }}>Add Task</h2>
          <img
            src={crossIcon}
            alt="Logo"
            width={24}
            height={24}
            onClick={() => setIsModalOpen(false)}
            style={{ cursor: "pointer" }}
          />
        </div>

        <input
          placeholder="Title"
          name="title"
          style={{
            height: 40,
            marginBottom: 12,
            border: "1px solid black",
            borderRadius: 8,
            outline: "none",
            backgroundColor: "white",
            color: "black",
          }}
          onChange={handleChange}
          value={formData.title}
        />

        <input
          placeholder="Description"
          name="description"
          style={{
            height: 40,
            marginBottom: 12,
            backgroundColor: "white",
            outline: "none",
            border: "1px solid black",
            borderRadius: 8,
            color: "black",
          }}
          value={formData.description}
          onChange={handleChange}
        />
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={1}
          dateFormat="MMMM d, yyyy h:mm aa"
          placeholderText="Select date and time"
          customInput={
            <input
              placeholder="Select a date"
              name="deadline"
              style={{
                height: 40,
                marginBottom: 12,
                width: "98%",
                backgroundColor: "white",
                outline: "none",
                border: "1px solid black",
                borderRadius: 8,
                color: "black",
              }}
              onChange={handleChange}
            />
          }
        />
        <select
          name="status"
          style={{
            height: 40,
            marginBottom: 12,
            backgroundColor: "white",
            outline: "none",
            borderRadius: 8,
            color: "black",
          }}
          onChange={handleChange}
          defaultValue=""
        >
          <option value="" disabled>
            Select Status
          </option>
          <option value="ongoing">Ongoing</option>
          <option value="success">Success</option>
          <option value="failure">Failure</option>
        </select>
        <button
          onClick={() => {
            if (!formData.title || !formData.description || !formData.status) {
              alert("Please fill all the fields");
              return;
            }
            onAdd({
              ...formData,
              deadline: selectedDate ? selectedDate.getTime() : null,
            });
            setFormData({ title: "", description: "", status: "" });
            setSelectedDate(null);
            setIsModalOpen(false);
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Modal;
