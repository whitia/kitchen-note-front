const Footer = () => {
  let title = process.env.NEXT_PUBLIC_SITE_TITLE
  return (
    <>
      <div className="container mx-auto max-w-2xl mt-8 py-4 text-center">
        <span className="text-neutral-400 text-xs dark:text-neutral-600">
          &copy; 2022 {title}
        </span>
      </div>
    </>
  )
}

export default Footer
