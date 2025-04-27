// Функция isErrorWithMessage - типовой предикат (type predicate) в TypeScript.
// Она проверяет, является ли переданное значение error объектом, содержащим свойство message типа string.
// error is { message: string } – типовой предикат, который говорит TypeScript:
// "если функция возвращает true, тогда error считается объектом с полем message типа string".
// Без этой записи, TS будет видеть только boolean.

export function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === "object" && // Проверяем, что error – это объект
    error != null && // Убеждаемся, что это не null
    "message" in error && // Проверяем, что у объекта есть свойство 'message'
    typeof (error as any).message === "string" // Убеждаемся, что это строка
  );
}
