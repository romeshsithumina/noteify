import { Card } from "react-bootstrap";
import Skeleton from "@mui/material/Skeleton";
import { bgcolor } from "@mui/system";
import { MdDelete } from "react-icons/md";

const LoadingSkeleton = () => {
  return (
    <Card className={`bg-[#FFFBF5] h-[200px] w-min-[150px]`}>
      <Card.Body
        className="overflow-hidden"
        style={{
          maskImage: "linear-gradient(180deg, #000 70%, transparent)",
        }}
      >
        <Card.Title className="font-bold flex align-middle justify-center gap-4">
          <Skeleton
            variant="rectangular"
            height={35}
            animation="wave"
            className="mb-3"
            width={`${Math.floor(Math.random() * (95 - 80 + 1)) + 80}%`}
          />
          <MdDelete className="text-[#5945458a] ms-auto" />
        </Card.Title>
        <Card.Text>
          <Skeleton variant="rectangular" animation="wave" className="mb-1" />
          <Skeleton
            variant="rectangular"
            animation="wave"
            className="mb-1"
            width="80%"
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            className="mb-1"
            width="100%"
          />
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ bgcolor: "#FCF9F5" }}
        />
      </Card.Footer>
    </Card>
  );
};

export default LoadingSkeleton;
