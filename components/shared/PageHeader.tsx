interface PageHeaderProps {
  title: string
  description?: string
  action?: React.ReactNode
}

const PageHeader = ({ title, description, action }: PageHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h1>
        {description && <p className="text-gray-500 mt-1 text-sm">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
export default PageHeader;