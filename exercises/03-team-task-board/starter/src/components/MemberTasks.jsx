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
    <div>
      <h2>
        Tasks for {member ? member.name : "Member not found"}
      </h2>
      {memberTasks.length === 0 ? (
        <p>No tasks assigned.</p>
      ) : (
        <div>
          {memberTasks.map(task => (
            <div key={task.id}>
              <p>{task.title}</p>
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