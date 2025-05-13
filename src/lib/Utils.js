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
 * @param {string} dateString - Data em string (ISO, etc.)
 * @returns {string} - Data formatada (Ex: 13 de maio de 2025)
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}
