import React from "react";
import { useParams } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import { teamMembers } from "../data/team";

export default function Member() {
  const { id } = useParams();

  const { state } = useTasks(); 

  const memberId = Number(id); 

  const member = teamMembers.find(m => m.id === memberId);

  const memberTasks = state.tasks.filter(
    task => task.assigneeId === memberId
  );

  return (
    <div className="items-center bg-slate-100 w-screen h-screen  text-center">
      <h1 className="font-bold pt-9 text-xl">Page displaying member tasks</h1>
      <h2 className="font-bold">
        Tasks for {member ? member.name : "Member not found"}
      </h2>
      {memberTasks.length === 0 ? (
        <p>No tasks assigned</p>
      ) : (
        <div className="bg-white rounded-4xl p-3">
          {memberTasks.map(task => (
            <div key={task.id}>
              <p className="text-gray-500">{task.title}</p>
              <p>
                Priority: {task.priority} | Status: {task.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}