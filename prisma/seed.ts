import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.exercise.count();
  if (count === 0) {
    await prisma.exercise.createMany({ data: [
      { name: "Жим лёжа", muscleGroup: "Грудь", description: "Базовое упражнение для грудных мышц." },
      { name: "Приседания со штангой", muscleGroup: "Ноги", description: "Упражнение для квадрицепсов и ягодичных мышц." },
      { name: "Тяга верхнего блока", muscleGroup: "Спина", description: "Тяговое упражнение для мышц спины." },
      { name: "Подъём гантелей на бицепс", muscleGroup: "Руки", description: "Изолированная нагрузка на бицепс." },
      { name: "Жим гантелей сидя", muscleGroup: "Плечи", description: "Упражнение для дельтовидных мышц." },
      { name: "Планка", muscleGroup: "Пресс", description: "Статическое упражнение на мышцы корпуса." }
    ]});
  }
  if (await prisma.trainingPlan.count() === 0) {
    await prisma.trainingPlan.createMany({ data: [
      { title: "Full Body — 3 раза в неделю", description: "Тренировка всего тела с чередованием нагрузки.", daysPerWeek: 3 },
      { title: "Верх / Низ", description: "Разделение тренировок на верхнюю и нижнюю части тела.", daysPerWeek: 4 }
    ]});
  }
  if (await prisma.workout.count() === 0) {
    await prisma.workout.create({ data: { title: "Первая тренировка", duration: 55, completed: true, notes: "Пример записи. Можно изменить или удалить." } });
  }
}
main().finally(() => prisma.$disconnect());