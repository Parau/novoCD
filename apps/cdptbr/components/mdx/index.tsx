import Image from 'next/image'
import Link from 'next/link'

export const Callout = ({ children, type = 'note' }: { children: React.ReactNode; type?: 'note' | 'warn' }) => (
  <div className={`p-4 rounded-xl border ${type === 'warn' ? 'bg-yellow-50 border-yellow-300' : 'bg-slate-50 border-slate-200'}`}>
    {children}
  </div>
)

export { Image, Link }