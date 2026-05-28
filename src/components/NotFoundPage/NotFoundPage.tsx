import capitalize from "@/src/utils/functions/capitalize";

type NotFoundPageProps = {
   category: string;
};

const NotFoundPage = ({ category }: NotFoundPageProps) => {
   return (
      <div className="w-full h-full flex flex-col items-center justify-center">
         <p>{`${capitalize(category)} not found`}</p>
      </div>
   );
};

export default NotFoundPage;
