import { config } from "../../config/env";
import { logger } from "../../utils/logger";

export interface DrugInsight {
  medicationName: string;
  warnings: string | null;
  boxedWarning: string | null;
  adverseReactions: string | null;
}

export class OpenFDAService {
  private baseUrl = config.openFDA.baseUrl;

  private extractGenericName(medicationString: string): string {
    return medicationString.split(" ")[0].toLowerCase();
  }

  private emptyInsight(medicationName: string): DrugInsight {
    return {
      medicationName,
      warnings: "No FDA data found for this medication.",
      boxedWarning: null,
      adverseReactions: null,
    };
  }

  public async getDrugInsights(medicationString: string): Promise<DrugInsight> {
    const genericName = this.extractGenericName(medicationString);

    if (!genericName) {
      return this.emptyInsight(medicationString);
    }

    try {
      logger.info(
        `Fetching FDA data for medication: ${genericName}`,
        "OpenFDAService",
      );

      const response = await fetch(
        `${this.baseUrl}?search=openfda.generic_name:"${genericName}"&limit=1`,
      );

      if (!response.ok) {
        logger.warn(
          `FDA API request failed with status ${response.status} for medication: ${genericName}`,
          "OpenFDAService",
        );
        return this.emptyInsight(medicationString);
      }

      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        logger.info(
          `No FDA data found for medication: ${genericName}`,
          "OpenFDAService",
        );
        return this.emptyInsight(medicationString);
      }

      const result = data.results[0];

      return {
        medicationName: medicationString,
        warnings: result.warnings ? result.warnings[0] : null,
        boxedWarning: result.boxed_warning ? result.boxed_warning[0] : null,
        adverseReactions: result.adverse_reactions
          ? result.adverse_reactions[0]
          : null,
      };
    } catch (error) {
      logger.error(
        `Error fetching FDA data for medication: ${genericName}`,
        error,
        "OpenFDAService",
      );
      return this.emptyInsight(medicationString);
    }
  }
}
