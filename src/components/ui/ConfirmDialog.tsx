import { AlertTriangle } from 'lucide-react'
import { Modal } from './Modal'
import { Button } from './Button'

interface Props {
  isOpen: boolean; onClose: () => void; onConfirm: () => void
  title?: string; message: string; confirmLabel?: string; isLoading?: boolean; variant?: 'danger' | 'primary'
}

export const ConfirmDialog = ({ isOpen, onClose, onConfirm, title = 'Are you sure?', message, confirmLabel = 'Confirm', isLoading, variant = 'danger' }: Props) => (
  <Modal isOpen={isOpen} onClose={onClose} size="sm">
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
        <AlertTriangle className="h-6 w-6 text-red-600" />
      </div>
      <div>
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm text-slate-500">{message}</p>
      </div>
      <div className="flex w-full gap-3">
        <Button variant="outline" className="flex-1" onClick={onClose} disabled={isLoading}>Cancel</Button>
        <Button variant={variant} className="flex-1" onClick={onConfirm} isLoading={isLoading}>{confirmLabel}</Button>
      </div>
    </div>
  </Modal>
)
