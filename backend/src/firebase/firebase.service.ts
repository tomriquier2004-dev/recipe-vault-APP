import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FirebaseService implements OnApplicationBootstrap {
    private db!: admin.firestore.Firestore;

  onApplicationBootstrap() {
    const serviceAccount = JSON.parse(
        readFileSync(join(process.cwd(), 'backend/src/firebase-service-account.json'), 'utf8')
      );

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    this.db = admin.firestore();

  }

  getDb(): admin.firestore.Firestore {
    return this.db;
  }
}