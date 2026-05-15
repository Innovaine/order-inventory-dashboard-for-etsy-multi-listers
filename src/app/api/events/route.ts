// Day 12: Analytics event logging
// POST /api/events - logs user interaction events to JSON file for seller validation phase
// ASSUMPTION: Simple file-based logging is sufficient for day 12 validation (2-3 sellers)
// ASSUMPTION: /tmp/analytics-events.json is writable in the Docker container

import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const EVENTS_FILE = '/tmp/analytics-events.json';

interface AnalyticsEvent {
  timestamp: string;
  eventType: string;
  shopId?: string;
  metadata?: Record<string, any>;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { eventType, metadata } = body;

    if (!eventType || typeof eventType !== 'string') {
      return NextResponse.json(
        { error: 'eventType is required and must be a string' },
        { status: 400 }
      );
    }

    // Build event record
    const event: AnalyticsEvent = {
      timestamp: new Date().toISOString(),
      eventType,
      metadata: metadata || {},
    };

    // Append to file (create if doesn't exist)
    try {
      // Read existing events
      let events: AnalyticsEvent[] = [];
      try {
        const content = await fs.readFile(EVENTS_FILE, 'utf-8');
        events = JSON.parse(content);
      } catch (err: any) {
        // File doesn't exist yet or is empty - start fresh
        if (err.code !== 'ENOENT') {
          console.error('Error reading events file:', err);
        }
      }

      // Append new event
      events.push(event);

      // Write back to file
      await fs.writeFile(EVENTS_FILE, JSON.stringify(events, null, 2), 'utf-8');

      return NextResponse.json({ success: true, event });
    } catch (fileError) {
      console.error('Failed to write event to file:', fileError);
      // Non-blocking - don't fail the request if logging fails
      return NextResponse.json(
        { success: false, error: 'Failed to log event' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Analytics event error:', error);
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
