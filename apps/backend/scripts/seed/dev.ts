import db, { genId } from '../../src/modules/db';

const run = async () => {
  await db.submission.createMany({
    data: [
      {
        id: genId(),
        submittedAt: new Date(),
        data: {
          name: 'Peter Parker',
          twitter: '@peterparker',
        },
      },
    ],
  });
  console.log('111', db.submission.findMany());
};

// Auto-run when called directly
run().then(() => {
  console.log('Data seed complete');
  process.exit();
});
