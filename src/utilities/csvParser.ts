import Papa from 'papaparse';
import { IMetric } from '../types/index.js';

interface CSVRow {
  date: string;
  mrr: string;
  users: string;
  churn: string;
  new_users: string;
  revenue: string;
}

export const parseCSV = (fileContent: string): Promise<IMetric[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse<CSVRow>(fileContent, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      transformHeader: (header: string) => header.trim().toLowerCase().replace(/\s+/g, '_'),
      complete: (results) => {
        try {
          const metrics: IMetric[] = results.data.map((row: any) => {
            // Validate required fields
            if (
              !row.date ||
              row.mrr === undefined ||
              row.users === undefined ||
              row.churn === undefined ||
              row.new_users === undefined ||
              row.revenue === undefined
            ) {
              throw new Error('Missing required fields in CSV. Expected: date, mrr, users, churn, new_users, revenue');
            }

            return {
              userId: '', // Will be set in the route handler
              date: new Date(row.date),
              mrr: parseFloat(row.mrr),
              users: parseInt(row.users),
              churn: parseFloat(row.churn),
              newUsers: parseInt(row.new_users),
              revenue: parseFloat(row.revenue)
            };
          });

          // Validate data
          metrics.forEach((metric, index) => {
            if (isNaN(metric.date.getTime())) {
              throw new Error(`Invalid date format at row ${index + 2}`);
            }
            if (metric.mrr < 0 || metric.users < 0 || metric.churn < 0 || metric.newUsers < 0 || metric.revenue < 0) {
              throw new Error(`Negative values not allowed at row ${index + 2}`);
            }
            if (metric.churn > 100) {
              throw new Error(`Churn rate cannot exceed 100% at row ${index + 2}`);
            }
          });

          resolve(metrics);
        } catch (error) {
          reject(error);
        }
      },
      error: (error: any) => {
        reject(new Error(`CSV parsing error: ${error.message}`));
      }
    });
  });
};
