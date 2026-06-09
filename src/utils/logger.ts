const ANSI_RESET = "\x1b[0m";
const ANSI_BOLD = "\x1b[1m";
const ANSI_BLUE = "\x1b[34m";
const ANSI_GREEN = "\x1b[32m";
const ANSI_ORANGE = "\x1b[38;5;208m";
const ANSI_RED = "\x1b[31m";
const ANSI_GRAY = "\x1b[90m";

class Logger {
  private formatMessage(
    level: string,
    color: string,
    message: string,
    context?: string,
  ) {
    const timestamp = new Date().toISOString();
    const contextStr = context
      ? `${ANSI_ORANGE}[${context}]${ANSI_RESET} `
      : "";

    return `${ANSI_GRAY}${timestamp}${ANSI_RESET} ${color}${ANSI_BOLD}[${level}]${ANSI_RESET} ${contextStr}${message}`;
  }

  public info(message: string, context?: string) {
    console.log(this.formatMessage("INFO", ANSI_BLUE, message, context));
  }

  public success(message: string, context?: string) {
    console.log(this.formatMessage("SUCCESS", ANSI_GREEN, message, context));
  }

  public warn(message: string, context?: string) {
    console.warn(this.formatMessage("WARN", ANSI_ORANGE, message, context));
  }

  public error(message: string, trace?: unknown, context?: string) {
    console.error(this.formatMessage("ERROR", ANSI_RED, message, context));
    if (trace) {
      console.error(`${ANSI_GRAY}${trace}${ANSI_RESET}`);
    }
  }
}

export const logger = new Logger();
