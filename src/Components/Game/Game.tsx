import { AnimateSharedLayout } from "framer-motion";
import TableStack from "./TableStack/TableStack.jsx";
import PlayerStack from "./PlayerStack/PlayerStack.jsx";
import { Card, Player, useGameStore } from "../../stores/gameStore";
import { useEffect } from "react";
import LeftStack from "./LeftStack/LeftStack.jsx";
import RightStack from "./RightStack/RightStack.jsx";
import TopStack from "./TopStack/TopStack.jsx";
import data from "../../api/data.json";
import { shuffle } from "../../utils/helpers.js";
import BotsServer, {
  IMoveEvent,
  IStartEvent,
} from "../../BotsServer/BotsServer";
import DrawingStack from "./DrawingStack/DrawingStack.jsx";

export default function Game() {
  const { init, setPlayerId, move } = useGameStore();

  useEffect(() => {
    BotsServer.init();
    for (let i = 0; i < 3; i++) {
      BotsServer.joinPlayer(data.players[i] as Player, true);
    }

    BotsServer.addEventListener("start", ({ cards, players }: IStartEvent) => {
      init([...players], [...cards]);
    });

    BotsServer.addEventListener(
      "move",
      ({ card, draw, cardsToDraw }: IMoveEvent) => {
        move(card, draw, cardsToDraw);
      }
    );
    setPlayerId(BotsServer.joinPlayer(data.players[3] as Player));
  }, [init]);

  return (
    <div>
      <AnimateSharedLayout>
        <TableStack />
        <TopStack />
        <LeftStack />
        <RightStack />
        <DrawingStack />
        <PlayerStack />
      </AnimateSharedLayout>
    </div>
  );
}
