import { FACE_ORDER, getFaceForCycleIndex, getOrientation } from '../../lib/cubeGeometry.ts'
import { CubeFace } from './CubeFace.tsx'
import type { TimerConfig } from '../../types/timer.ts'

type TimerCubeProps = {
  cycleIndex: number
  focusSessionsBeforeLongBreak: number
  remainingMs: number
  config: TimerConfig
  justCompleted: boolean
}

export function TimerCube({
  cycleIndex,
  focusSessionsBeforeLongBreak,
  remainingMs,
  config,
  justCompleted,
}: TimerCubeProps) {
  const orientation = getOrientation(cycleIndex, focusSessionsBeforeLongBreak)
  const activeFace = getFaceForCycleIndex(cycleIndex, focusSessionsBeforeLongBreak)
  const viewTiltX = -16
  const viewTiltY = 28

  return (
    <div
      className={`cube ${justCompleted ? 'is-complete' : ''}`}
      data-active-face={activeFace}
      data-cycle-index={cycleIndex}
      style={{
        transform: `rotateX(${orientation.rotateX + viewTiltX}deg) rotateY(${orientation.rotateY + viewTiltY}deg)`,
      }}
    >
      {justCompleted ? <span className="sr-only">Period complete</span> : null}
      {FACE_ORDER.map((face) => (
        <CubeFace
          key={face}
          face={face}
          isActive={face === activeFace}
          remainingMs={remainingMs}
          config={config}
        />
      ))}
    </div>
  )
}
