import { DndProvider, useDrag } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const col1 = [
  {
    id: 'col1-1',
    content: 'Item 1 (C1)'
  },
  {
    id: 'col1-2',
    content: 'Item 2 (C1)'
  },
  {
    id: 'col1-3',
    content: 'Item 3 (C1)'
  }
]

function Drag({ item }) {
  const [{ isDragging, before, after }, drag] = useDrag(
    {
      type: 'card',
      item: {
        id: item.id
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging,
        before: monitor.getInitialSourceClientOffset(),
        after: monitor.getSourceClientOffset()
      })
    }
  )

  console.log(item.id, before, after);

  return (
    <>
      <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
        {item.content}
      </div>
    </>
  )
}

export default function Test() {
  return (
    <DndProvider backend={HTML5Backend}>
      {col1.map((item) => (
        <Drag key={item.id} item={item} />
      ))}
    </DndProvider>
  )
}
