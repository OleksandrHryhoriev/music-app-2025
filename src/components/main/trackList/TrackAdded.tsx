import formateDate from "@/src/utils/functions/formateDate";

type TrackAddedProps = {
   added: string;
};

const TrackAdded = ({ added }: TrackAddedProps) => {
   return (
      <div className="track-added text-sm secondary-text">
         {formateDate(added)}
      </div>
   );
};

export default TrackAdded;
