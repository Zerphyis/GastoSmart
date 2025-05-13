import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combina classes usando clsx e tailwind-merge
 * @param  {...any} inputs - Lista de classes
 * @returns {string} - Classes combinadas e otimizadas
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Formata uma data no formato "MMM dd, yyyy" em inglês
 * @param {string} dateString - Data em string (ISO, etc.)
 * @returns {string} - Data formatada (Ex: Jan 01, 2025)
 */
export function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}
