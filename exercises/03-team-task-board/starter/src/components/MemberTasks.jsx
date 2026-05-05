import React from "react";
import { useParams } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import { teamMembers } from "../data/team";

export default function Member() {
  const { id } = useParams();

  const { state } = useTasks(); // ✅ correct destructuring

  const memberId = Number(id); // ✅ convert string → number

  // ✅ find member info
  const member = teamMembers.find(m => m.id === memberId);

  // ✅ filter tasks for this member
  const memberTasks = state.tasks.filter(
    task => task.assigneeId === memberId
  );

  return (
    <div className="p-6">
      {/* Member Info */}
      <h2 className="text-xl font-bold mb-4">
        Tasks for {member ? member.name : "Unknown Member"}
      </h2>

      {/* Tasks */}
      {memberTasks.length === 0 ? (
        <p className="text-slate-500">No tasks assigned.</p>
      ) : (
        <div className="space-y-3">
          {memberTasks.map(task => (
            <div key={task.id} className="bg-white p-3 rounded shadow">
              <p className="font-medium">{task.title}</p>
              <p className="text-sm text-slate-500">
                Priority: {task.priority} | Status: {task.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}