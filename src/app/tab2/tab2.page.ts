import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service'; 

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {
  questions: { question: string; correct: string; answers: string[] }[] = []; 
  currentQuestionIndex = 0;
  currentQuestion: { question: string; correct: string; answers: string[] } | null = null;
  score = 0;
  isAnswered = false;
  selectedAnswer: string | null = null; 
  correctAnswer: string | null = null; 

  constructor(private storageService: StorageService) {} 

  async ngOnInit() {
    await this.loadStoredProgress(); 
    this.generateQuestions();
    this.loadQuestion();
  }

  generateQuestions() {
    this.questions = [
      { question: "What is the largest planet in our solar system?", correct: "Jupiter", answers: ["Saturn", "Earth", "Mars"] },
      { question: "Who was the first person to walk on the Moon?", correct: "Neil Armstrong", answers: ["Buzz Aldrin", "Yuri Gagarin", "Alan Shepard"] },
      { question: "What is the hottest planet in our solar system?", correct: "Venus", answers: ["Mercury", "Mars", "Earth"] },
      { question: "Which planet is known as the Red Planet?", correct: "Mars", answers: ["Jupiter", "Venus", "Saturn"] },
      { question: "What galaxy is Earth located in?", correct: "Milky Way", answers: ["Andromeda", "Whirlpool", "Sombrero"] },
      { question: "How many moons does Mars have?", correct: "2", answers: ["1", "3", "4"] },
      { question: "What is the name of NASA’s most famous space telescope?", correct: "Hubble Telescope", answers: ["Kepler Telescope", "Voyager", "Galileo"] },
      { question: "Who was the first woman in space?", correct: "Valentina Tereshkova", answers: ["Sally Ride", "Mae Jemison", "Kalpana Chawla"] },
      { question: "What is the smallest planet in our solar system?", correct: "Mercury", answers: ["Mars", "Venus", "Earth"] },
      { question: "What protects Earth from harmful solar radiation?", correct: "Ozone Layer", answers: ["Magnetosphere", "Troposphere", "Stratosphere"] },
    ];
  }

  loadQuestion() {
    this.isAnswered = false;
    this.selectedAnswer = null; 
    this.correctAnswer = null; 

    if (this.currentQuestionIndex < this.questions.length) {
      const questionData = this.questions[this.currentQuestionIndex];
      const answers = [...questionData.answers, questionData.correct];
      this.currentQuestion = {
        question: questionData.question,
        answers: this.shuffleArray(answers),
        correct: questionData.correct,
      };
    } else {
      this.currentQuestion = null; 
      this.clearStoredProgress();
    }
  }

  shuffleArray(array: string[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  async selectAnswer(answer: string) {
    if (this.isAnswered) return;
    this.isAnswered = true;

    this.selectedAnswer = answer; 
    this.correctAnswer = this.currentQuestion?.correct || null; 

    if (answer === this.currentQuestion?.correct) {
      this.score += 10;
    }

    await this.saveProgress(); 

    setTimeout(async() => {
      this.currentQuestionIndex++;
      await this.saveProgress();
      this.loadQuestion();
    }, 4000);
  }

  async saveProgress() {
    await this.storageService.save('quizScore', this.score);
    await this.storageService.save('quizQuestionIndex', this.currentQuestionIndex);
  }

  async loadStoredProgress() {
    const storedScore = await this.storageService.load('quizScore');
    const storedIndex = await this.storageService.load('quizQuestionIndex');

    if (storedScore !== null) {
      this.score = storedScore;
    }

    if (storedIndex !== null) {
      this.currentQuestionIndex = storedIndex;
    }
  }

  async clearStoredProgress() {
    await this.storageService.remove('quizScore');
    await this.storageService.remove('quizQuestionIndex');
  }

  async restartQuiz() {
    this.score = 0; 
    this.currentQuestionIndex = 0; 
    await this.clearStoredProgress(); 
    this.loadQuestion(); 
  }
}
