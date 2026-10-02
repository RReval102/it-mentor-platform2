describe('IT Mentor E2E tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Usability test: Payment button color should not be red (designed to fail)', () => {
    cy.get('#loginEmail').clear().type('student');
    cy.get('#loginPassword').clear().type('123');
    cy.get('button[type="submit"]').click();
    
    // Check payment button color
    cy.get('#paymentButton').should('not.have.css', 'background-color', 'rgb(255, 0, 0)');
  });

  it('E2E scenario: Student passes final exam and gets certificate', () => {
    // Login as student
    cy.get('#loginEmail').clear().type('student');
    cy.get('#loginPassword').clear().type('123');
    cy.get('button[type="submit"]').click();

    // Start course
    cy.contains('Продолжить обучение').click();

    // Navigate to Final Exam (assuming id 3)
    cy.get('#sidebar-lesson-3').click();

    // Select correct answer (index 2: driver.find_element())
    cy.get('input[name="testOpt"][value="2"]').check();
    cy.contains('Ответить').click();

    // Check success message
    cy.contains('Правильно! Курс успешно завершен');

    // Wait for redirect to certificate
    cy.url().should('include', '/certificate', { timeout: 4000 });
    cy.contains('СЕРТИФИКАТ');
    cy.get('#certStudentName').should('contain', 'Иван Иванов');
  });

  it('E2E scenario: Mentor checks homework', () => {
    // Login as mentor
    cy.get('#loginEmail').clear().type('mentor');
    cy.get('#loginPassword').clear().type('123');
    cy.get('button[type="submit"]').click();

    // Check mentor dashboard loaded
    cy.contains('Панель ментора');

    // Click check button for first task (id 101)
    cy.get('#btn-101').click();

    // Wait for checking to complete
    cy.get('#badge-101', { timeout: 3000 }).should('contain', 'Проверено');
  });
});
