import { Command } from './commands/Command.js';

export class History {
  private commands: Command[] = [];
  private currentIndex: number = -1;

  addCommand(command: Command): void {
    this.commands.splice(this.currentIndex + 1); // удаляем отменённые
    this.commands.push(command);
    this.currentIndex++;
    command.execute();
  }

  undo(): void {
    if (this.currentIndex >= 0) {
      this.commands[this.currentIndex].undo();
      this.currentIndex--;
    }
  }

  redo(): void {
    if (this.currentIndex < this.commands.length - 1) {
      this.currentIndex++;
      this.commands[this.currentIndex].execute();
    }
  }

  getCommands(): Command[] {
    return this.commands.slice(0, this.currentIndex + 1);
  }
}
