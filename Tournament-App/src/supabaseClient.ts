// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gnizexyukhsxshxtqvof.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduaXpleHl1a2hzeHNoeHRxdm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2MTIzMTYsImV4cCI6MjA2MTE4ODMxNn0.jWY9R2-qPK6ZytOs81Q2eFLt0XZ_b7APo4Jm7LH1wKc'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase
