import icon from "@/assets/icons/arrowRightBreadcrumb.svg"; // Adjust the path as necessary

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center justify-center text-sm font-medium text-muted-foreground" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="inline-flex items-center text-lg font-normal text-dark-3">
              {!isLast ? (
                <>
                  <a href={item.href} className="hover:underline">
                    {item.label}
                  </a>
                  <img src={icon} className="mx-2 h-6 w-6" alt="" />
                  
                </>
              ) : (
                <span className="text-primary-blue font-medium">{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
