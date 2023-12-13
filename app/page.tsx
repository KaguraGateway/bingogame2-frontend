import { BingoNumber } from "@/ui/BingoNumber";
import styles from '../ui/NumberIcon.module.scss';

export default function Page() {
  return(
    <div>
      <BingoNumber type="tapNumber" bingoNumber={10}/>
    </div>
  );
}