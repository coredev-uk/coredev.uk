/**
 * Shared utility for project status color coding
 * Ensures consistency across all components that display project status
 */

export const statusColors = {
  "active": "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
  "archived": "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200",
  "departed": "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
} as const;

export type ProjectStatus = keyof typeof statusColors;

/**
 * Get the CSS classes for a project status
 * @param status - The project status
 * @returns CSS classes for the status badge
 */
export function getStatusClasses(status: string | undefined): string {
  if (!status) return statusColors.active; // default fallback
  return statusColors[status as ProjectStatus] || statusColors.active;
}

/**
 * Get all available status options
 * @returns Array of status options
 */
export function getStatusOptions(): ProjectStatus[] {
  return Object.keys(statusColors) as ProjectStatus[];
}