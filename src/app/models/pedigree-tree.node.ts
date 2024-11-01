import {PigeonDTO} from "../dto/pigeon.dto";

export interface PedigreeTreeNode {
  pigeon: PigeonDTO;
  father?: PedigreeTreeNode;
  mother?: PedigreeTreeNode;
}
