import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { TaskModal } from './TaskModal';
import { Edit3 } from 'lucide-react';
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Task, Status } from '../types';

const SortableTask = ({ task, onEdit, handleComplete, deleteTask }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`monolith-card ${task.status === 'DONE' ? 'rubble-state' : ''} ${isDragging ? 'is-dragging' : ''}`}
      {...attributes}
      {...listeners}
    >
      <div style={{ cursor: 'grab', height: '100%' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <span className={`priority-${task.priority.toLowerCase().replace(' ', '')}`} style={{ 
            padding: '0.5rem 1rem', fontFamily: 'var(--font-mono)', fontWeight: 900, fontSize: '1rem',
            background: 'var(--color-border)', color: 'var(--color-surface)'
          }}>
            {task.priority}
          </span>
        </div>

        <h4 className="chiseled-text" style={{ fontSize: '2rem', fontWeight: 900, wordBreak: 'break-word', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', color: 'var(--color-text-primary)' }}>
          {task.title}
        </h4>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button onPointerDown={(e) => { e.stopPropagation(); onEdit(task); }} className="concrete-btn" style={{ padding: '0.5rem', flex: 1 }}>
            <Edit3 size={20} /> EDIT
          </button>
          {task.status !== 'DONE' && (
            <button onPointerDown={(e) => { e.stopPropagation(); handleComplete(task.id); }} className="concrete-btn" style={{ padding: '0.5rem', flex: 1, background: 'var(--color-accent-blue)', color: '#fff' }}>
              CRUSH
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export const Board = () => {
  const { tasks, moveTask, deleteTask, setTasks } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const columns: { id: Status; label: string }[] = [
    { id: 'BACKLOG', label: 'THE UNDONE' },
    { id: 'IN_PROGRESS', label: 'ACTIVE LABORS' },
    { id: 'DONE', label: 'ETERNAL MONUMENTS' }
  ];

  const handleComplete = (id: string) => {
    if (navigator.vibrate) navigator.vibrate([100, 50, 100]); // Heavy haptic feedback
    document.body.classList.add('quake-active');
    setTimeout(() => document.body.classList.remove('quake-active'), 600);
    moveTask(id, 'DONE');
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    if (navigator.vibrate) navigator.vibrate(20);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find(t => t.id === active.id);
    const overId = over.id as string;
    
    // If dropped on a column header/zone
    if (['BACKLOG', 'IN_PROGRESS', 'DONE'].includes(overId)) {
      if (activeTask && activeTask.status !== overId) {
        moveTask(active.id as string, overId as Status);
        if (navigator.vibrate) navigator.vibrate(50); // Heavy thud
      }
      return;
    }

    // If dropped on another task
    const overTask = tasks.find(t => t.id === overId);
    if (activeTask && overTask && activeTask.status !== overTask.status) {
      moveTask(active.id as string, overTask.status);
      if (navigator.vibrate) navigator.vibrate(50);
    }
  };

  const activeTask = tasks.find(t => t.id === activeId);

  return (
    <div className="ionic-column" style={{ padding: '6rem 4rem', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setEditingTask(null); }} 
        taskToEdit={editingTask} 
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '6rem', borderBottom: 'var(--border-monument)', paddingBottom: '2rem' }}>
        <div>
          <h2 className="chiseled-text" style={{ fontSize: '5rem', fontWeight: 900, lineHeight: 1 }}>THE AGORA</h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 900, marginTop: '1rem', color: 'var(--color-text-secondary)' }}>
            DRAG AND DROP LABORS BETWEEN COLUMNS.
          </p>
        </div>
        <button 
          onClick={() => { setIsModalOpen(true); }} 
          className="concrete-btn"
          style={{ background: 'var(--color-border)', color: 'var(--color-surface)', fontSize: '1.5rem' }}
        >
          FORGE NEW BLOCK
        </button>
      </div>

      <DndContext 
        sensors={sensors} 
        collisionDetection={closestCorners} 
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>
          {columns.map((col) => {
            const columnTasks = tasks.filter(t => t.status === col.id);
            return (
              <div key={col.id} style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                <h3 className="chiseled-text" style={{ fontSize: '2.5rem', fontWeight: 900, borderBottom: '8px solid var(--color-border)', paddingBottom: '1rem' }}>
                  {col.label}
                </h3>
                
                <SortableContext id={col.id} items={columnTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', minHeight: '500px', border: '4px dashed rgba(0,0,0,0.1)', padding: '1rem' }}>
                    {columnTasks.map(task => (
                      <SortableTask 
                        key={task.id} 
                        task={task} 
                        onEdit={(t: Task) => { setEditingTask(t); setIsModalOpen(true); }}
                        handleComplete={handleComplete}
                        deleteTask={deleteTask}
                      />
                    ))}
                  </div>
                </SortableContext>
              </div>
            );
          })}
        </div>

        <DragOverlay>
          {activeTask ? (
            <div className="monolith-card is-dragging" style={{ width: '350px' }}>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <span className={`priority-${activeTask.priority.toLowerCase().replace(' ', '')}`} style={{ 
                  padding: '0.5rem 1rem', fontFamily: 'var(--font-mono)', fontWeight: 900, fontSize: '1rem',
                  background: 'var(--color-border)', color: 'var(--color-surface)'
                }}>
                  {activeTask.priority}
                </span>
              </div>
              <h4 className="chiseled-text" style={{ fontSize: '2rem', fontWeight: 900 }}>{activeTask.title}</h4>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};
